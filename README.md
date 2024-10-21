# Go Blog

A full-stack blog application built with Golang, Gin framework for the backend, React for the frontend, and SQLite as the lightweight database. This platform allows users to create, edit, and view blog posts, featuring user authentication.

## Features
- User authentication (sign up, log in, log out)
- Create, and edit blog posts
- Responsive frontend built with React
- RESTful API powered by Golang and Gin framework
- Lightweight data storage using SQLite

## Technology Stack
- **Frontend**: React.js
- **Backend**: Golang (Gin Framework)
- **Database**: SQLite
- **API Communication**: JSON & REST APIs

## API Endpoints
- **GET** `/api/posts` - Fetch all blog posts
- **POST** `/api/create-post` - Create a blog post
- **GET** `/api/post/:slug` - Fetch a single post by slug
- **GET** `/api/post/:slug/image` - Fetch the image associated with the post by slug
- **POST** `/api/create-user` - Create a new user
- **POST** `/api/login` - Login an existing user
- **GET** `/api/user-info` - Get the complete profile of an user
- **GET** `/api/basic-user-info` - Get the partial profile of an user
- **PUT** `/api/update-user` - Update the user profile information
- **GET** `/api/validate-token` - Validates the JWT for the user

## Docker Setup

This application includes a `docker-compose.yml` file to facilitate ease in development of both the frontend and backend services in a containerized environment.

### Docker Compose Overview

The `docker-compose.yml` file defines the configuration for two services:
- **Backend**: Runs the Golang and Gin-based API server.
- **Frontend**: Hosts the React frontend.
