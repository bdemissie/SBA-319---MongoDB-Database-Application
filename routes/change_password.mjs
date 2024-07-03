import express from 'express';
import db from "../db/conn.mjs";

// Create a router module
const router = express.Router();

router.get('/', (req, res) => {

    res.render('change_password');

});

router.post('/', async (req, res) => {

    try {
        let collection = await db.collection('users');

        const {email, username, password:password} = req.body; 

        const query = {email: email, username: username};

        const result = await collection.findOne(query);

        if(!result) {

            res.status(404).json({error: 'Incorrect username/email combination. Password change not successful.'})
        }

        else {

            await collection.updateOne(query, {
                $set: {password: password}
            });

            res.status(200).json({ message: 'Password updated successfully.' });
        }
    
    }
    
    catch (err) {
        res.status(500).json({ message: 'Error changing password', error: err.message });
    }
})

export default router;