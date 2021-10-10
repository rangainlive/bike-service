# SECTION A:
# Step 1: Create and setup backend
Initialize with the "npm init -y" command to setup basic node.js backend package.json file

# Step 2: Install basic npm packages for express.js
Install express, mongoose, dotenv, cors npm packages to setup and create a basic express.js backend server and mongoose for MongoDB Atlas database connection. Install nodemon dev dependency to rerun the server for each save (to cut short the manual restart). For this purpose to initialize "start" variable in package.json with the value of "nodemon server.js(it's optional based on your server file)"

# Step 3: Initialize expres.js Server and listen PORT 5050 (port number optional for individual perspective)
Initialize express variable from express package and initialize express app.

# Step 4: environment (.env) file to declare the secure data:
create a .env file to add the secured data with relevent variable names, before declaring that import dotenv package and configure the package in server.js (server file).

# Step 5: Using Mongoose to connect the Database
Before connect to database -> open MongoDB Atlas account with free usage nad follow the steps to connect the database with express.js server.
    -> Open https://www.mongodb.com/ page
    -> create a free Account (easy way to login with your Gmail Account)
    -> Once login into your MongoDB account -> left Top cornor you may notice the dropdown list field, where you can have an option to create your new Database with the new Project option and also you can access your previous projects.
    -> Click the New Project button in the dropdown list
    -> Now Create a Project Window will open, where we have text input field to Name our Project and click next button.
    -> In the next step you can add your project member if any, if you are individual developer for your project you can directly click the Create Project button it will create a database project for your web application.
    -> Now you can see your Dashboard for your new database project.
    -> We need to setup some basic changes to connect the created database to our web application.
    ->First: SECURITY:(in the leftside Nav)
        -> Network Access: (Access from everywhere)
            -> Click the Network Access in the lef nav
            -> It will show to add IP address for database project.
            -> click Add IP Address button -> you will notice pop-up to Add IP Access List Entry
            -> Enter the -> 0.0.0.0/0 (ip address) -> in the Access List Entry input field. The given ip address will be helpful to access our databse from everywhere.
            -> Comment will be an optional field. you can skip also.
        -> Database Access: (for Database Users)
            -> Click the Database Access in the lef nav. In this proces we create user to access the database.
            -> click Add New Database User button.
            -> Once clicked the button you can see the Add New Database User pop-up page.
            -> In the pop-up we noticed the Password Authentication text, below that we have two input fields. First one will be a space for your database name. Second one will be a password field. You should be remember the username & password to connect the database from our backend exprss.js.
            -> Once entered the both username, password then without changing anything in that pop-up, click the Add User button in the bottom to create a user for database access.
            -> Now you have an user to access the database
    ->Second: Deployment (From leftNav top):
        -> Databases: (to setup Databases)
            -> Once click the Databases button -> you have a page Database Deploymnet in that page click the Build a Database button.
            -> This click take you to the pricing page options, in that you can choose Free Shared option to create Cluster for your database only one for your one project. Second cluster take into purchasing option.
            -> Once select the Free Shared and click Create button below in that. 
            -> Next Step, we need to select Cloud Provider and Region. For me I choose Asia (specifically Mumbai). you can choose any region for your convenient. Then scroll to bottom means you will notice the storage, version everything, and you have a naming option for your cluster. To click the collapsible button with option of Cluster Name, then it will extend the div to have an input field, where we can enter and change the cluster name. Once change the name or leave it as default, next to click the Create Cluster button to create a Cluster.
            -> It will take some minutes based on your Internet speed to create your cluster.
    -> Connect:
        -> After some times your cluster(Database) will be ready for use.
        Next step to click the connect button in your recently created cluster. It will help you to connect the database with your application.
        -> Once click the connect button, it will pop-up the Connect to (cluster name) page, if you finished the Security connection as per our procedure in the previous steps then it directly move on to second step to choose a connection method, otherwise you need to setup the basic setting in the first step and move to second step.
         -> In the second step we need to select the 2nd option "Connect your application". Once selected it moves to 3rd step Connect.
         -> In the 3rd step you will notice that driver for your backend language preference and version. Here I'm using Node.js my backend, so I choose Node.js version 4.0 or later.
         -> In the 2nd point in that page you have a full driver example code. Just copy the code and using the code to create a DATABASE_ACCESS varibale in the .env file in our backend files.
         -> It is mandatory to replace the "<password>" text in the sample code with your added user password, and then replace the "myFirstDatabase" text with your database name.
    -> Backend code Changes in the server page for Mongodb Cconnections.

    -> Once the DATABASE_ACCESS Variable created in the .env file. Then, in server.js (server file) we initialize the mongoose varible from mongoose package to connect the database.

# Step 8: Modal - Database Scheme's 
    -> for store, update, select and deleting data in the database i created 3 different modal scheme's 
    1. userScheme
        -> with field of userName, email, password, mobile, location, gender, plan, vehicleNo, vehicleModal.
        -> to maintain all the customer related data's in one collection named "users".
        -> it used to store user login credentials.
    2. serviceScheme
        -> with field of email, serviceType, isBooked, serviceDate, status, isCompleted
        -> to maintain all the customer bike service appointment related data's in one collection named "services".
        -> Customers book an appointment for service.
    3. listServiceScheme
        -> with field of serviceName
        -> to maintain all the bike service's list in one collection named "serviceLists".
        -> admin can add new services as per their wish.


# Step 7: Routing - Add Routing
    -> based on the functionality create a different routing path to store, get, update and delete the data's from client user to database.

    1. POST Request (http://localhost:5050/app/login) 
        - users login api call
    2. POST Request (http://localhost:5050/app/register) 
        - users register api call
    3. GET Request (http://localhost:5050/app/details) 
        - get users details using this api call
    4. POST Request (http://localhost:5050/app/addservice) 
        - admin add new services 
    5. GET Request (http://localhost:5050/app/servicelist)
        - to get all the added types of service list
    6. POST Request (http://localhost:5050/app/bookservice)
        - customers to book service using this api call
    7. GET Request (http://localhost:5050/app/bookedservice)
        - to get all the booked services to display in respective user's panel
    8. GET Request (http://localhost:5050/app/adminbookedservice)
        - to get all the booked services to display in admin panel
    9. GET Request (http://localhost:5050/app/userslist)
        - to get all the registered users in admin panel
    10. POST Request (http://localhost:5050/app/updateuser)
        - to update user their own information using this api call
    11. POST Request (http://localhost:5050/app/updateservice)
        - to update the service status from admin side
    12. POST Request (http://localhost:5050/app/updatevehicle)
        - to update the vehicle related information
    13. POST Request (http://localhost:5050/app/removeuser)
        - admin to remove the user access from this application.
    
# SECTION B:
# Step 1: Create front end using basic node commands
    -> Using "npx create-react-app bike-service" command to create front end using react js.
    -> remove the unused boilerplate codes and install the required packages for designing purpose.
    -> install react-router-dom for Routing purpose, bootstrap for basic css styling and designing purpose, 
    axios for api calling, formik library for form designing, yup for form validation, bootstrap-icons for basic icons, styled-components for component styling names, material-ui for designing purpose and some other required npm packages install.

# Step 2: Install NPM Packages
    -> Once unzip the file move to frontend directory in command prompt/Terminal then execute the command "npm install" to get activate the node packages.

# Step 3: Components (Folder Structure)
    1. Navigation
         -> Header & Footer Components
    2. Dashboard
         -> Admin Dashboard Components
    3. Home
         => Admin & User Components
    4. Pages
         => Register & Login page Components, etc..
    5. ServiceComponents
         => to Book a service
    6. Update
         => Update user related informations
    7. UserComponents
         => User panel page Components.
    8. Utils
         => basic static variables
    9. resources 
         => static images files (admin, bike)


