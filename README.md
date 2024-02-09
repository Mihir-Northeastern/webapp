# webapp

 This guide will walk you through the prerequisites and steps needed to build and deploy the application locally.

## Prerequisites for Building and Deploying Your Application Locally

### Ensure you have the following installed on your system before proceeding with the setup:


1. Node.js: Install Node.js from https://nodejs.org/en/download/.
2. npm: Node.js installation will include npm, but if you need to install it separately, follow the instructions https://www.npmjs.com/get-npm
3. PostgreSQL: Install PostgreSQL from https://www.postgresql.org/download/


## Setup Instructions  
Follow these steps to get your application up and running:

1. Unzip the Project Archive:

If you have the project in a zipped file (webapp.zip), unzip it first using the following command:

````
unzip webapp.zip
````

2. Setup the .env File:

In the root directory of your project, create a .env file. You can do this using a text editor or via the command line:
 .env

Open the .env file and add the following environment variables with your own values:

````
PORT=3000
DB_HOST=127.0.0.1
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DIALECT=postgres

````
Replace your_db_name, your_db_user, and your_db_password with your actual database details. The DB_DIALECT should be postgres for PostgreSQL.


3. Install Dependencies:
Install all the necessary dependencies for the project by running:

````
npm install 'dependency name'
````

4. Start the Application:
Once the setup is complete and all dependencies are installed, you can start the application using:

````
npm run start or 
npm run dev
````

5. This command will start the server on the port specified in your .env file (default is 3000). You can access the web application by navigating to http://localhost:3000 in your web browser.

## Additional Information:

Ensure PostgreSQL is running before starting the application.

You might need to configure PostgreSQL according to your project's database schema. 

For development purposes, you may want to add a script in your package.json for running the application with nodemon for automatic restarts on code changes. You can do this by adding a script like "dev": "nodemon app.js" (replace app.js with your entry file) and then start your application in development mode with npm run dev.