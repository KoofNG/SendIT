import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Importing the application middle wares
import client from "./client";

// Importing of models
import user from "../../models/user";
import Payload from "../../models/payload";

const dbQueries = {

    // For Sign up
    doSignUp(req, res) {
        const newUser = new user();
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(req.body.password.trim(), salt);

        var savedUser;

        if (
            req.body.firstname.length != 0 &&
            req.body.lastname.length != 0 &&
            req.body.email.length != 0 &&
            req.body.password.length != 0
        ) {
            newUser.firstname = req.body.firstname.toLowerCase().trim();
            newUser.lastname = req.body.lastname.toLowerCase().trim();
            newUser.othername = req.body.othername.toLowerCase().trim();
            newUser.email = req.body.email.toLowerCase().trim();
            newUser.username = req.body.username.toLowerCase().trim();
            newUser.password = hashedPassword;
            newUser.registered = new Date().toUTCString();
            newUser.isAdmin = false;

            const text = "INSERT INTO users(firstname,lastname,othername,email,username,password,registered,isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
            const values = [`${newUser.firstname}`,`${newUser.lastname}`,`${newUser.othername}`,`${newUser.email}`,`${newUser.username}`,`${newUser.password}`,`${newUser.registered}`,`${newUser.isAdmin}`];

            client
                .query(text, values)
                .then(data => {
                    savedUser = data.rows[0];
                })
                .then(() => {
                    const payload = new Payload(savedUser.firstname,savedUser.lastname,savedUser.email,savedUser.username);
                    const token = jwt.sign(JSON.stringify(payload), "12345");
                    res.json({
                        status: 200,
                        data: [{
                            token : token,
                            user : {
                                firstname: savedUser.firstname,
                                lastname: savedUser.lastname,
                                email: savedUser.email,
                                username: savedUser.username
                            }
                        }],
                        message: "User created successfully"
                    });
                })
                .catch(err => console.error(err));
        } else {
            res.json({
                status: 401,
                message: "Provide data in the required fields"
            });
        }
    },

    // For Login
    doLogin(req, res, next) {

        if((req.body.email.length != 0 || req.body.username.length != 0) && req.body.password.length != 0){
            var savedUser;
            var verifiedUser;
            
            const text = 'SELECT * FROM users WHERE email = $1 OR username = $2';
            const values = [`${req.body.email}`,`${req.body.username}`];

            client.query(text,values)
            .then(data => {
                if (data.rows.length != 0) {
                    verifiedUser = data.rows[0].password;
                    const isCorrect = bcrypt.compareSync(req.body.password, verifiedUser);
                    if (isCorrect) {
                        savedUser = data.rows[0];
                        var payload = new Payload(savedUser.firstname,savedUser.lastname,savedUser.email,savedUser.username);
                        const token = jwt.sign(JSON.stringify(payload), "12345");
                        res.json({
                            status: 200,
                            data : [{
                                token : token,
                                user: {
                                    firstname : savedUser.firstname,
                                    lastname: savedUser.lastname,
                                    email: savedUser.email,
                                    username : savedUser.username
                                }
                            }]
                        })
                    } else {
                        res.json({
                            status : 401,
                            data : [{
                                message : 'Incorrect Parameters'
                            }]
                        });
                    }
                } else {
                    res.json({
                        data: 'No such records exists'
                    })
                }                              
            })
        } else {
            res.json({
                status: 401,
                message: "Provide data in the required fields"
            });
        }
    }

};

export default dbQueries;
