"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const models_1 = require("../models");
const auth_config_1 = require("../config/auth.config");
const User = models_1.db.user;
const Role = models_1.db.role;
const Op = models_1.db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
    console.log("signup");
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
        else {
            user.setRoles([1]).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
        }
    })
        .catch(err => {
        res.status(500).send({ message: err.message });
        console.log(err.message);
    });
};
exports.signin = (req, res) => {
    console.log("signin");
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({ id: user.id }, auth_config_1.config.secret, {
            expiresIn: 86400
        });
        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
    })
        .catch(err => {
        res.status(500).send({ message: err.message });
        console.log(err.message);
    });
};
//# sourceMappingURL=auth.controller.js.map