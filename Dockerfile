FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 11111

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

COPY . /src
WORKDIR /src

RUN dotnet publish -c Release -o /app './Source/DiscountCodes.SignalR/DiscountCodes.SignalR.csproj'

FROM base AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT dotnet DiscountCodes.SignalR.dll