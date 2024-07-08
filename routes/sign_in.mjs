// Import required modules
import express from 'express';
import db from "../db/conn.mjs";

// Create a router module
const router = express.Router();

// Create a get route fro the sign in page
router.get('/', (req, res) => {
    // Render the sign in view
    res.render('sign_in');

});

// Create a post route for the sign in page
router.post('/', async (req, res) => {

    try {

    let collection = await db.collection('users');

    const { username, password } = req.body;

    let query = { username: username, password: password };

    let result = await collection.findOne(query);

    if (!result) {
        res.status(404).json({ error: 'Incorrect username or password' })
    }

    else {

        res.status(200).json({
            message: `welcome: ${result.first_name} ${result.last_name}`,
            userInfo: result,
        });
    }

}

catch (err) {
    res.status(500).json({ message: 'Error signing in', error: err.message });
}


})

export default router;