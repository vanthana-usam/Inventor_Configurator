# First Stage: Build the C# application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS dotnet-builder
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

# Copy the C# build artifacts from the first stage
COPY --from=dotnet-builder /app/build /csharp-plugin/

# Expose the port for the Node.js app (if necessary)
EXPOSE 3000:8080

# Start the application
CMD ["npm", "start"]
