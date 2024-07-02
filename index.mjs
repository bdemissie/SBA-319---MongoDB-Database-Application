import express from "express"
import dotenv from "dotenv"
import db from "./db/conn.mjs";
import signUpRouter from './routes/sign_up.mjs'



const router = express.Router();

const PORT = process.env.PORT || 3000;

const app = express();


// Set views path and view engine setup
app.set("views", "./views"); // specify the views directory
app.set("view engine", "ejs"); // register the template engine

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

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

app.get("/", (req, res) => {
    res.send("Welcome to the SBA 319 MongoDB Database Application")
})

// Use the signup rouete 
app.use('/sign-up', signUpRouter);

app.use((err, _req, res, next) => {
    res.status(500).send(err)
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})