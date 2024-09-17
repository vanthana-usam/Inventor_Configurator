# Stage 1: Build Node.js Application
FROM node:18-alpine AS node-builder

# Set working directory
WORKDIR /INVENTOR_CONFIG

# Copy package.json and package-lock.json
COPY WebApplication/ClientApp/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Node.js app
COPY WebApplication/ClientApp/ .

# Build Node.js application
RUN npm run build

# Stage 2: Build .NET Core Application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-builder

# Set working directory
WORKDIR /INVENTOR_CONFIG

# Copy .NET solution file and project files
COPY WebApplication/*.sln ./
COPY WebApplication/**/*.csproj ./

# Restore dependencies
RUN dotnet restore WebApplication/*.csproj

# Copy the rest of the .NET app
COPY WebApplication/ ./

# Build and publish the .NET application
RUN dotnet publish WebApplication/*.csproj -c Release -o /app/publish

# Stage 3: Final Image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final

# Set working directory
WORKDIR /INVENTOR_CONFIG

# Copy Node.js build output
COPY --from=node-builder /INVENTOR_CONFIG/ClientApp /INVENTOR_CONFIG/ClientApp

# Copy .NET Core build output
COPY --from=dotnet-builder /app/publish /app/dotnet

# Expose ports
EXPOSE 3000 80

# Command to run Node.js and .NET application
CMD [ "sh", "-c", "cd /INVENTOR_CONFIG/ClientApp && npm start & cd /INVENTOR_CONFIG/WebApplication && dotnet YourSolution.sln" ]

