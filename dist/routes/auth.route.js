"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const verifySignUp_1 = require("../middlewares/verifySignUp");
const auth_controller_1 = require("../controllers/auth.controller");
exports.authRoute = (app) => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/api/auth/signup", [
        verifySignUp_1.verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp_1.verifySignUp.checkRolesExisted
    ], auth_controller_1.signup);
    app.post("/api/auth/signin", auth_controller_1.signin);
};
//# sourceMappingURL=auth.route.js.map