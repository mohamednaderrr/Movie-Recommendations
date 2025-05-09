const express = require('express')
const app = express()
const port = process.env.PORT || 5005
const bcrypt = require('bcrypt')
const path = require('path')
const collection = require('./config')
const jwt = require('jsonwebtoken');
const cors = require('cors');


app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';


// routes
app.get('/', (req, res) => {
    res.send('home Page Back')
})

app.get('/login', (req, res) => {
    res.send('login')
})

app.get('/signup', (req, res) => {
    res.send('signup')
})

//Registe User : 
app.post('/signup', async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password
        }

        const existingUser = await collection.findOne({ email: data.email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists. Choose a different email.' });
        }

        else {
            const hashedPassword = await bcrypt.hash(data.password, 10)
            data.password = hashedPassword
            const userdata = await collection.insertMany(data)
            res.status(201).json({ message: 'User registered successfully.' });
            console.log(userdata)
            res.redirect("/login")
        }
    } catch {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }

})

//Login : 
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });



        // إرسال الاستجابة
        res.status(200).json({
            message: 'Login successfully', token, user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.listen(port, (req, res) => {
    console.log(`Application is listening at port ${port}`)
    console.log(`http://localhost:${port}`)
})






