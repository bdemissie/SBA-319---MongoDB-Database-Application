import express from 'express';
import db from "../db/conn.mjs";

// Create a router module
const router = express.Router();


router.get('/sign-in', (req, res) => {

    res.render('admin');

});

router.post('/sign-in', async (req, res) => {

    try {

    let collection = await db.collection('users');

    const { username, password } = req.body;

    let query = { username: username, password: password };

    let result = await collection.findOne(query);
    

    if (!result) {
        res.status(404).json({ error: 'Incorrect username or password' })
    }

    else if (!result.admin) {
        res.status(404).json({ error: 'User has no admin privilage' })
    }

    else {

        const adminApiList = [

            {   
                method: "GET",
                endpoint: '/admin/users',
                description: 'Get a list of user names, emails and usernames'
            },
            {   
                method: "DELETE",
                endpoint: '/admin/user/:id',
                description: 'Get user by id'
            },
            {
                method: "GET",
                endpoint: 'admin/:username',
                description: "Get user by username",
            },
            {
                method: "PATCH",
                endpoint: 'admin/:username',
                description: "Update user's username"
            },
            {
                method: "PATCH",
                endpoint: 'admin/:id/isadmin',
                description: "Update user's admin privileges"
            },
            {
                method: "POST",
                endpoint: "admin/user/add",
                description: "Create a new user"
            }

        ]

        res.status(200).json({
            message: `welcome: ${result.first_name} ${result.last_name}`,
            userInfo: result,
            admin_apis: adminApiList
        });
    }
}

catch (err) {
    res.status(500).json({ message: 'Error signing in', error: err.message });
}

})


export default router;