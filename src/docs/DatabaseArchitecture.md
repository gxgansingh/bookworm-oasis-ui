
# Library Management System Database Architecture

## Overview
This document outlines how our React frontend connects to a MySQL database through a C program backend.

## Architecture Components

### 1. Frontend (React/TypeScript)
- User interface for library management
- Makes API calls to the backend server
- Displays data retrieved from MySQL database

### 2. Backend (C Program)
- Handles business logic and database operations
- Exposes REST API endpoints for the frontend
- Performs CRUD operations on the MySQL database
- Implements authentication and authorization

### 3. Database (MySQL)
- Stores all library data (books, members, transactions)
- Implements relational data model
- Ensures data integrity through constraints and triggers
- Optimized for library management operations

## Data Flow
1. User interacts with React frontend
2. Frontend makes HTTP requests to C backend API
3. C program processes requests and executes SQL queries
4. MySQL database returns data to C program
5. C program formats response and sends to frontend
6. Frontend updates UI with received data

## Integration Points
- Frontend uses fetch API to communicate with C backend
- C backend uses MySQL C API to connect to database
- Authentication tokens are used for secure communication
