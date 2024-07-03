import express from 'express';
import db from "../db/conn.mjs";

// Create a router module
const router = express.Router();


router.get('/', (req, res) => {

    res.render('sign_up');
});

router.post('/', async (req, res) => {

    const { first_name, last_name, phone_number, username, email, password } = req.body;

    // Check if the user is already signed up.

    let collection = await db.collection('users');

    let userExists = await collection.findOne({
        $or: [
            {first_name: first_name, last_name: last_name},
            {email: email}
        ]
    })

    let userNameExists = await collection.findOne({
        username: username
    })
    

    if (userExists) {

   
        return res.status(400).json({ error: 'User already exists' });

    }

    if(userNameExists) {

        return res.status(400).json({error: 'username already taken'});

    }

    const newUser = {
        first_name,
        last_name,
        phone_number,
        username,
        email,
        password,
    }

    try {

        const collection = await db.collection('users');
        await collection.insertOne(newUser);
        res.redirect('/sign-in');

    }

    catch (err) {
        console.error("Error inserting new user: " + err)
        res.status(500).send('something went wrong');
    }
})

export default router;
