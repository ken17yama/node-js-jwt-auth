"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderatorBoard = exports.adminBoard = exports.userBoard = exports.allAccess = void 0;
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
//# sourceMappingURL=user.controller.js.map