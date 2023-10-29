![Code Coverage](https://img.shields.io/badge/code--coverage-97.8%25-brightgreen)
![GitHub Actions](https://github.com/Kevin-ishimwe/my--brand-kevin-NEM_backend/actions/workflows/node-js.yml/badge.svg?branch=DEVELOP)
[![Maintainability](https://api.codeclimate.com/v1/badges/672c53f58afff393e21e/maintainability)](https://codeclimate.com/github/Kevin-ishimwe/my--brand-kevin-NEM_backend/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Project Description:

This project is a meticulously engineered backend system that leverages a stack of industry-standard technologies to power and support my professional portfolio. The core components of this system include:

Node.js: The project relies on the asynchronous and event-driven architecture of Node.js, enabling high performance and scalability.

MongoDB: MongoDB serves as the database management system, providing a flexible and schema-less data storage solution. It efficiently handles and organizes the data that drives the portfolio.

Express: The Express framework is used to build a robust and efficient API layer. It simplifies routing, middleware integration, and request handling, allowing for smooth and predictable API interactions.

JWT (JSON Web Tokens): To ensure secure authentication and authorization, JSON Web Tokens are employed. These tokens enable the project to securely manage user sessions and access control.
    
# backend_portfolio
To get you started you can simply clone the repository:

```
git clone https://github.com/Kevin-ishimwe/my--brand-kevin-NEM_backend.git
```

and install the dependencies

```
npm install
```

### Run the Application

The project is preconfigured with a development web server. The simplest way to start this server is:

    npm run dev
 open browser and hit the root

### to access the API documentation

    [http://localhost:1256/documentaion](http://localhost:1256/documentation/)

## Running the Project with Docker

You can easily run this project using Docker Compose. Follow these steps:

### 1. Install Docker

If you don't have Docker installed, you can download and install it from the official website:

[Install Docker](https://www.docker.com/get-started)

### 2. Start the Docker Container

Open your terminal and navigate to your project's root directory. Then, run the following command to start your project with Docker Compose:

```bash
docker compose up

### Project Structure

following an MVC (Models, Routes, Controllers) architecture without serving static pages.
# environment variables

```
DB_TEST_LINK=*mongodb dbs local link
ACCESS_TOKEN_SECRET=*generate an access token
REFRESH_TOKEN_SECRET=*generate an refresh token
DB_PRODUCTION_LINK=mongodb+srv://ishimwekevin:333Ha0bZBJq9OEzY@mybrandportfolio.qgke1dn.mongodb.net/MybrandPortfolioProduction?retryWrites=true&w=majority
```


