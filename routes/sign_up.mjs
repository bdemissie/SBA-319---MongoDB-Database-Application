import express from 'express';
import db from "../db/conn.mjs";

// Create a router module
const router = express.Router();


router.get('/', (req, res) => {
    
    res.render('admin-actions');
});

router.post('/', async (req, res) => {

    const {first_name, last_name, phone_number, username, email, password} = req.body;

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
        res.redirect('/sing-in');
             
    }

    catch (err) {
        console.error("Error inserting new user: " + err)
        res.status(500).send('something went wrong');
    }
})

export default router;
