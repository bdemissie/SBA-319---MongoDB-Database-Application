import express from "express"
import dotenv from "dotenv"
import { BSONType } from "mongodb";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

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
                        bsonType: "string",
                        description: " 'phone_number' is required and must match the pattern of a phone number",
                        pattern: "^[0-9]{10, 16}$"
                    },
                    username: {
                        "bsonType": "string",
                        "description": "must be a string, start with a letter, and is required",
                        "pattern": "^[a-zA-Z][a-zA-Z0-9_]*$"
                      },
                    email: {
                        "bsonType": "string",
                        "description": "must be a string and is required",
                        "pattern": "^\\S+@\\S+\\.\\S+$"
                      },
                    password: {
                        "bsonType": "string",
                        "description": "must be a string with min 6 characters and is required",
                        "minLength": 6
                      },
                    admin: {
                        "bsonType": "bool",
                        "description": "must be a boolean and is optional",
                        "default": false
                    }

                }

            }
        }
    }
}

app.get("/", (req, res) => {
    res.send("Welcome to the SBA 319 MongoDB Database Application")
})

app.use((err, _req, res, next) => {
    res.status(500).send(err)
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})