// Import required modules

import express from "express"
import dotenv from "dotenv"
import db from "./db/conn.mjs";
import signUpRouter from './routes/sign_up.mjs'
import signInRouter from './routes/sign_in.mjs'
import changePasswordRouter from './routes/change_password.mjs'
import adminRouter from './routes/admin.mjs'
import methodOverride from "method-override"


// Create an express application instance
const app = express();

// Create an express router
const router = express.Router();

// Read the port number from the .env
dotenv.config();
const PORT = process.env.PORT || 3000;
console.log(PORT)


// Specify the views directory and register .ejs template engines
app.set("views", "./views");
app.set("view engine", "ejs");


// Setup the Midleware to parse json bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Midlware to support method overide for html views
app.use(methodOverride('_method'));

// Create a collection with Schema Validation

async () => {
    await db.createCollection("users"), {

        // Create the validator object 
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "User Validation",

                required: ["first_name", "last_name", "phone_number", "user_name", "email"],

                properties: {

                    first_name: {
                        bsonType: "string",
                        description: " 'first_name' is required and must be a string"
                    },
                    last_name: {
                        bsonType: "string",
                        description: " 'last_name' is required and must be a string"
                    },
                    phone_number: {
                        bsonTypes: "string",
                        description: " 'phone_number' is required and must match the pattern of a phone number",
                        pattern: "^[0-9]{10, 16}$"
                    },
                    username: {
                        bsonType: "string",
                        description: "must be a string, start with a letter, and is required",
                        pattern: "^[a-zA-Z][a-zA-Z0-9_]*$"
                    },
                    email: {
                        bsonType: "string",
                        description: "must be a string and is required",

                    },
                    password: {
                        bsonType: "string",
                        description: "must be a string with min 6 characters and is required",
                        minLength: 6
                    },
                    admin: {
                        bsonType: "bool",
                        description: "must be a boolean and is optional",
                        default: false
                    }

                }

            }
        }
    }
}

// Define the root route path and assign a welcome message
app.get("/", (req, res) => {
    res.send("Welcome to the SBA 319 MongoDB Database Application")
})

// Use the signup router
app.use('/sign-up', signUpRouter);

// Use the signin router
app.use('/sign-in', signInRouter);

// use the change_password router
app.use('/change-password', changePasswordRouter);

// use the admin router
app.use('/admin', adminRouter);

// Error handling Middleware
app.use((err, _req, res, next) => {
    res.status(500).send(err)
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})