FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
EXPOSE 8080

# copy .csproj and restore as distinct layers
COPY "TheWorryList.sln" "TheWorryList.sln"
COPY "TheWorryList.API/TheWorryList.API.csproj" "TheWorryList.API/TheWorryList.API.csproj"
COPY "TheWorryList.Application/TheWorryList.Application.csproj" "TheWorryList.Application/TheWorryList.Application.csproj"
COPY "TheWorryList.Domain/TheWorryList.Domain.csproj" "TheWorryList.Domain/TheWorryList.Domain.csproj"
COPY "TheWorryList.Infrastructure/TheWorryList.Infrastructure.csproj" "TheWorryList.Infrastructure/TheWorryList.Infrastructure.csproj"
COPY "TheWorryList.Persistence/TheWorryList.Persistence.csproj" "TheWorryList.Persistence/TheWorryList.Persistence.csproj"

RUN dotnet restore "TheWorryList.sln"

# copy everything else and build
COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out

# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "TheWorryList.API.dll" ]