const express = require('express');
const auth = express.Router();
const db = require('./dbConnection');
const {signupValidation, loginValidation} = require('./validation');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Handles registration with relevant checks and validations.
 */
auth.post('/register', signupValidation, (req, res) => {

    // Checks req for errors using validation method
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    db.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
            req.body.username
        )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This user is already in use!'
                });
            } else {
                // Username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
                        // If user password is hashed, add it to database
                        db.query(
                            `INSERT INTO users (username, password) VALUES ('${req.body.username}', ${db.escape(hash)})`,
                            (err) => {
                                if (err) {
                                    return res.status(400).send({
                                        msg: err
                                    });
                                }
                                return res.status(201).send({
                                    msg: 'The user has been registered!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

/**
 * Handles login with relevant checks and validations.
 */
auth.post('/login', loginValidation, (req, res) => {

    // Checks req for errors using validation method
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {

            // User does not exists
            if (err) {
                return res.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    msg: 'Email or password is incorrect!'
                });
            }

            // Check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {

                    // Wrong password
                    if (bErr) {
                        return res.status(401).send({
                            msg: 'Email or password is incorrect! Error: ' + bErr
                        });
                    }
                    // If password is correct return token and update users last login to database
                    if (bResult) {
                        const token = jwt.sign({
                            id: result[0].id,
                            user: result[0].username
                        }, 'jfhkhfkerhgt4345jkfsdjkhf', {expiresIn: '1h'});
                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
});
module.exports = auth;