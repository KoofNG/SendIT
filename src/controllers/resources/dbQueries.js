import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Importing the application middle wares
import client from "./client";

// Importing of models
import user from "../../models/user";
import Payload from "../../models/payload";


// For Sign up
function doSignUp() {
    
}

// For Login


authorize.post("/signup", (req, res) => {
    const newUser = new user();
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(req.body.password.trim(), salt);
    var token;
    var savedUser;

    if (req.body.firstname.length != 0  && req.body.lastname.length != 0 && req.body.email.length != 0 && req.body.password.length != 0){
        newUser.firstname = req.body.firstname.toLowerCase().trim();
        newUser.lastname = req.body.lastname.toLowerCase().trim();
        newUser.othername = req.body.othername.toLowerCase().trim();
        newUser.email = req.body.email.toLowerCase().trim();
        newUser.username = req.body.username.toLowerCase().trim();
        newUser.password = hashedPassword;
        newUser.registered = new Date().toUTCString();
        newUser.isAdmin = false;

        const text = 'INSERT INTO users(firstname,lastname,othername,email,username,password,registered,isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *'
        const values = [`${newUser.firstname}`, `${newUser.lastname}`, `${newUser.othername}`, `${newUser.email}`, `${newUser.username}`, `${newUser.password}`, `${newUser.registered}`, `${newUser.isAdmin}`]


        client.query(text, values)
            .then(res => {
                // console.log('Data inserted successfully');
                savedUser = res.rows[0];
                console.log(".......................")
                console.log(savedUser);
                console.log(".......................")


                const payload = new Payload(savedUser.firstname, savedUser.lastname, savedUser.email, savedUser.username);
                console.log("****************");
                console.log(payload);
                console.log("****************");

                token = jwt.sign(JSON.stringify(payload), "12345");
                console.log(token);
            })
            .catch(e => console.error(e.stack));

        res.json({
            status: 200,
            token: token,
            message: "Data inserted successfully"
        });

    } else {
        res.json({
            status: 401,
            message: "Fill in required fields"
        });
    }
});

authorize.post("/login", (req, res) => { });

export default authorize;
