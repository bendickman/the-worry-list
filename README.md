# The Worry List

## Development Environment

The project was built using Visual Studio Code targeting .NET 6 & React 18

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Architecture Overview

The architecture approach for this application has taken inspiration from Jason Taylor's [Clean Architecture](https://github.com/jasontaylordev/CleanArchitecture)

### TheWorryList.Api

Web API targeting .NET Core 6 that provides all the endpoints of the application (details to follow)

### TheWorryList.Application

Feature implementation using MediatR

### TheWorryList.Domain

Domain entities used throughout the application

### TheWorryList.Persistence

Data access including migration and seed data.

In order to run the PostgreSQL database, you need to install docker and run the following command. which will install the required container:

`docker run --name dev -e POSTGRES_USER=youruser -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres:latest`

### TheWorryList.Infrastructure

Utility classes such as email sender

### client-app

React 18 client-side application that interacts with the backend Web API

## Technologies

* [.NET 6](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-6.0)
* [React 18](https://reactjs.org/)
* [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
* [SqLite](https://www.sqlite.org/index.html) (dev) & [PostgreSQL](https://www.postgresql.org/) (production)
* [Swagger](https://swagger.io/)
* [JWT Authentication & Authorization](https://jwt.io/)
* [MediatR](https://github.com/jbogard/MediatR)

## API Endpoints

### User

- User login

*Http POST* `/api/user/login`

- User registration

*HTTP POST* `/api/user/register`

- Get current user

*HTTP GET* `/api/user`

### Worry Items

- Get all worry items

*HTTP GET* `/api/my-worry-items`

- Get worry item

*HTTP GET* `/api/my-worry-items/{id}`

- Add new worry item

*HTTP POST* `/api/my-worry-items`

- Update worry item

*HTTP PUT* `/api/my-worry-items/{id}`

- Delete worry item

*HTTP DELETE* `/api/my-worry-items/{id}`

- Mark worry item as 'complete'

*HTTP POST* `/api/my-worry-items/{id}/complete`

The easiest way to test the API is via the Swagger definition located at `/swagger/index.html`

