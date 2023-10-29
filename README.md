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

### Prerequisites

You need git to clone the repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

A number of node.js tools is necessary to initialize and test the project. You must have node.js and its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json and include express, mongodb and mongoose.

#### MongoDB

The project uses MongoDB as a database. If you are on Mac and using Homebrew package manager the installation is as simple as `brew install mongodb`.

### Start the MongoDB server

First we need to create the `.env` files where the database files will live in. In your terminal navigate to the `root` of your system by doing `cd ..` until you reach the top directory. You can create the directory by running `sudo mkdir -p /data/db`. Now open a different tab in your terminal and run `mongod` to start the Mongo server.

### Run the Application

The project is preconfigured with a simple development web server. The simplest way to start this server is:

    npm run dev

### to access the API documentation

    npm run doc

open a browser

### Project Structure

following an MVC (Models, Routes, Controllers) architecture without serving static pages.
