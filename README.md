# Catflix - A nestJS Sample Project


## Description

This is a sample project for learning the basics of nestJS framework. 


## Getting Started

### Requirements

- Node.js >= v16
- A recent version of MariaDB or Mysql (tested with 10.4.21-MariaDB).


### Installation

- Clone the repository.
- Run `npm install` to install the dependencies.


### Configuration

- Set up the database connection settings in `.env` file.
- Create an empty database.
- Run `npm run typeorm schema:sync` to migrate the database.


### Running the app

```bash
# standard development mode
$ npm run start

# development mode with Webpack Hot Module Replacement
$ npm run start:hmr

# production mode
$ npm run start:prod
```

Navigate to [http://localhost:3000/api/](http://localhost:3000/api/) to interact with the swagger interface. 


## Usage

The app consists of an API with a swagger interface.


### Auth

- Users are registered with an **email and password**.
- There are two types of users;
  - `customer` has only access to basic operations. These can be found in **Customer Operations** section in swagger interface.
  - `manager` has CRUD access to *every resource*, as well as customer specific operations.
- All endpoints require **bearer tokens** for authentication.
- A bearer token is created or refreshed after each login.
- You may get the bearer token from the response of `/login` endpoint. It is named `token`.
- **Bearer token** authentication method was preferred over a **JWT** one, because nestJS documentation already shows every step to setup an JWT auth system. Therefore, it was not enough challenge, as I was trying to get my hands dirty with the framework.

### Customer Operations

- List all available movies;
  - Use `/movies` interface.
- List all available sessions;
  - Use `/sessions` interface. 
- Buy a ticket; 
  - Use `/tickets/buy` interface
  - Must specify a `sessionId`.
  - Checks age restriction. (`<`)
- Watch a movie;
  - Use `/movies/watch` interface.
  - Must specify the a `movieId`.
  - Checks whether logged-in user has tickets for the movie.
  - Tickets are single use, they are consumed after you watch a movie.
- Watch history;
  - Use `/tickets/history` interface.
  - This returns data in `ticket.session.movie, ticket.session.auditorium` format.
  - Use query parameter `watched="Watched"`.
  - Alternatively, you may use this filter to see all of your tickets, or unused ones.

## Technical

### Notes - Quirks

- Database columns named in *snake_case*, but attributes are *camelCase*.
- Table names use *plural* format, instead of singular, which is nestJS default. 

### Data Structure

**Legend:**
```
+ table/entity
- columns
> relations/FKs
```
**Structure**
```text
+ users
    - id
    - type              // Enum: 'customer'|'manager'
    - email
    - password
    - firstName
    - lastName
    - age
    - token             // Bearer token.
    > tickets
+ movies
    - id
    - name
    - description
    - minAge            // Age restriction.
    > sessions
+ auditoriums       // Movie rooms/halls.
    - id
    - name
    > sessions
+ sessions          // Movie sessions.
    - id
    - timeSlot          // Fixed list of enum values.
    - date
    > movieId
    > auditoriumId
+ tickets
    - id
    - isWatched         // Whether the ticket was consumed.
    > sessionId
    > userId
```
