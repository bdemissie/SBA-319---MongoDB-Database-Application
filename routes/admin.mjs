// Import required modules
import express from 'express';
import db from "../db/conn.mjs";
import { ObjectId } from 'mongodb';

// Create a router module
const router = express.Router();

// Create a get route to render the admin sign in page
router.get('/sign-in', (req, res) => {

    res.render('admin');

});

// Create a post route to show the available admin APIs
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
                method: "GET",
                endpoint: '/admin/user/id/:id',
                description: 'Get user by id'
            },
            {   
                method: "DELETE",
                endpoint: '/admin/user/id/:id',
                description: 'Get user by id'
            },
            {
                method: "GET",
                endpoint: 'admin/user/username/:username',
                description: "Get user by username",
            },
            {
                method: "PATCH",
                endpoint: 'admin/user/username/:username',
                description: "Update user's username"
            },
            {
                method: "PATCH",
                endpoint: 'admin/user/:id/:isadmin',
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

// Create a get route for admin to show all users 
router.get('/users', async (req, res) => {

    try{

        let collection = await db.collection('users');

        let result = await collection
        .aggregate(
            [
                {
                  '$project': {
                    '_id': 0, 
                    'first_name': 1, 
                    'last_name': 1, 
                    'email': 1, 
                    'username': 1
                  }
                }, {
                  '$limit': 5
                }
              ]
        ).toArray();
        res.send(result);
    }
    catch  (err) {

        res.status(500).json({ message: 'Something went wrong', error: err.message });

    }
})

// Create a get route to get a single user by ID
router.get('/user/id/:id', async (req, res) => {

    try {

        const collection = await db.collection('users');

        const query = {_id: new ObjectId(req.params.id) };
    
        const result =  await collection.findOne(query);
    
        res.send(result).status(200)
    }
    catch (err) {

            res.status(500).json({ message: 'Something went wrong', error: err.message });

    }
} )

// Create a delete route to find and delete user by ID
router.delete('/user/id/:id', async (req, res) => {

    try {

        const collection = await db.collection('users');

        const query = {_id: new ObjectId(req.params.id) };
    
        const result =  await collection.deleteOne(query);
    
        res.status(200).json({result: 'user removed'})
    }
    catch (err) {

            res.status(500).json({ message: 'Something went wrong', error: err.message });

    }
} )

// Create a get route to find and show user by username
router.get('/user/username/:username', async (req, res) => {

    try {

        const collection = await db.collection('users');

        const query = {username: req.params.username};
    
        const result =  await collection.findOne(query);
    
        res.send(result).status(200);
    }
    catch (err) {

            res.status(500).json({ message: 'Something went wrong', error: err.message });

    }
} )

// Greate a delete route to find and delete user by username
router.delete('/user/username/:username', async (req, res) => {

    try {

        const collection = await db.collection('users');

        const query = {username: req.params.username};
    
        const result =  await collection.deleteOne(query);
    
        res.status(200).json({result: 'user removed'})
    }
    catch (err) {

            res.status(500).json({ message: 'Something went wrong', error: err.message });

    }
} )

// Create a patch route to find and update user username
router.patch('/user/username/:username', async (req, res) => {

    try {

        const collection = await db.collection('users');

        const query = {username: req.params.username};
    
        let result =  await collection.updateOne(query, {
            $set: {username: req.params.newUsername}
        }
        );
    
        res.status(200).json({result: 'user name updated'})
    }
    catch (err) {

            res.status(500).json({ message: 'Something went wrong', error: err.message });

    }
} )

// Create a patch route to find user by ID and assign admin privilage
router.patch('/user/id/:id/:isadmin', async (req,res) => {

    try {

        let collection = await db.collection('users');

        let query = {_id: new ObjectId(req.params.id)};

        let result = await collection.updateOne(query, {
            $set: {"admin": req.params.isadmin}
        });
        res.status(200).json({result: 'user admin privilage updated'})
    }
    catch (err) {
        res.status(500).json({message: 'Something went wrong', error: err.message})
    }
})

// Create a post route to add a new 
router.post('/user/add', async(req, res) => {

    try {

        let collection = await db.collection('users');

        let newUser = req.body;

        let result = await collection.insertOne(newUser);

        res.status(200).json(result)
        
    }

    catch (err) {

        res.status(500).json({message: 'Something went wrong', error: err.message})

    }
}
)


export default router;