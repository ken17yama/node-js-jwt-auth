"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const authJwt_1 = require("../middlewares/authJwt");
const user_controller_1 = require("../controllers/user.controller");
exports.userRoute = (app) => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.get("/api/test/all", user_controller_1.allAccess);
    app.get("/api/test/user", [authJwt_1.authJwt.verifyToken], user_controller_1.userBoard);
    app.get("/api/test/mod", [authJwt_1.authJwt.verifyToken, authJwt_1.authJwt.isModerator], user_controller_1.moderatorBoard);
    app.get("/api/test/admin", [authJwt_1.authJwt.verifyToken, authJwt_1.authJwt.isAdmin], user_controller_1.adminBoard);
};
//# sourceMappingURL=user.route.js.map