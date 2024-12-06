# First Stage: Build the C# application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-builder
WORKDIR /INVENTOR_CONFIG

# Copy the solution and the necessary project files
COPY aps-configurator-inventor.sln ./
COPY WebApplication/WebApplication.csproj ./WebApplication/

# Restore the .NET dependencies
RUN dotnet restore WebApplication/WebApplication.csproj

# Copy all the C# project files and build
COPY . .
RUN dotnet build WebApplication/WebApplication.csproj -c Release -o /app/build

# Second Stage: Build the Node.js application
FROM node:18-alpine AS node-builder
WORKDIR /INVENTOR_CONFIG/WebApplication/ClientApp

# Copy the package.json and install dependencies
COPY WebApplication/ClientApp/package*.json ./

# Run npm install to install the dependencies
RUN npm install

# Copy the rest of the Node.js application
COPY WebApplication/ClientApp/ ./

# Build the Node.js application
RUN npm run build

# Final Stage: Combine and Serve Both
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final-stage
WORKDIR /app

# Copy C# backend build artifacts
COPY --from=dotnet-builder /app/build /app/

# Copy Node.js frontend build artifacts
COPY --from=node-builder /INVENTOR_CONFIG/WebApplication/ClientApp/build ./ClientApp/build/

# Expose ports for both applications
EXPOSE 3000 
EXPOSE 5000

# Start the backend application
CMD ["dotnet", "WebApplication.dll"]

