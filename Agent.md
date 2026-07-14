## Project Scope

This backend is being developed for the Programming Hero Full Stack TypeScript Assignment.

The backend must implement only the required features mentioned in the assignment.

Avoid adding unnecessary enterprise features unless explicitly requested.

Focus on:
- Clean Architecture
- Security
- Scalability
- Reusable Code
- Production-ready API

# EstateFlow Backend Blueprint

## Project Name

EstateFlow - Real Estate Property Listing Platform

---

# Goal

Build a production-ready backend using Express.js, TypeScript and MongoDB.

The backend must be scalable, modular, secure and follow REST API best practices.

Never generate the whole project at once.

Build one module at a time.

Wait for approval after each step.

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Zod Validation
- dotenv
- Helmet
- CORS
- Morgan
- Cookie Parser

---

# Backend Architecture

Use Feature-Based Architecture.

Each feature/module must contain:

- model
- interface
- validation
- service
- controller
- route

Business logic belongs inside services.

Controllers should remain thin.

---

# Folder Structure

src/

config/

middlewares/

modules/

utils/

interfaces/

types/

routes/

errors/

app.ts

server.ts

---

# Modules

## Authentication

Responsibilities

- Register User
- Login User
- Generate JWT
- Hash Password
- Verify Token

---

## Users

Responsibilities

- User Profile
- Get Current User

---

## Properties

Responsibilities

- Create Property
- Get All Properties
- Get Single Property
- Delete Property
- Search
- Filter
- Sort
- Pagination

---

## Reviews

Responsibilities

- Add Review
- Get Reviews
- Delete Review
- Calculate Average Rating

---

# Database Collections

users

properties

reviews

---

# Property Schema

- title
- shortDescription
- description
- propertyType
- price
- location
- bedrooms
- bathrooms
- area
- image
- rating
- createdBy
- createdAt

---

# User Schema

- name
- email
- password
- role
- createdAt

---

# Review Schema

- propertyId
- userId
- rating
- comment
- createdAt

---

# Authentication

JWT

Password Hashing using bcrypt

Protected Middleware

---

# Validation

Use Zod

Never trust client input.

Validate every request.

---

# API Design

RESTful API

Plural resource names.

Proper HTTP Status Codes.

Consistent JSON Response.

---

# Response Format

Success

{
  success,
  message,
  data
}

Error

{
  success,
  message,
  error
}

---

# Search

Search by

- title
- location

---

# Filter

Filter by

- property type
- minimum price
- maximum price

---

# Sort

- newest
- oldest
- lowest price
- highest price

---

# Pagination

Support

page

limit

total

totalPages

currentPage

---

# Error Handling

Centralized Global Error Handler

404 Middleware

Async Error Wrapper

---

# Security

JWT

Helmet

CORS

Password Hashing

Input Validation

Environment Variables

---

# Coding Standards

- TypeScript Strict Mode
- Never use any
- Reusable Code
- SOLID Principles
- DRY Principle
- Clean Code
- Feature-Based Structure
- Reusable Middlewares
- Proper Naming Convention

---

# Development Order

Step 1

Initialize Backend

---

Step 2

Folder Structure

---

Step 3

Express Configuration

---

Step 4

MongoDB Connection

---

Step 5

Authentication Module

---

Step 6

User Module

---

Step 7

Property Module

---

Step 8

Review Module

---

Step 9

Global Error Handling

---

Step 10

API Testing

---

Step 11

Backend Review

---

# AI Instructions

Always explain the implementation plan before writing code.

Never generate multiple modules together.

Generate only one feature at a time.

Wait for approval before continuing.

Keep everything production-ready.

Follow modern Express.js and TypeScript best practices.

Prioritize scalability, maintainability, and security.