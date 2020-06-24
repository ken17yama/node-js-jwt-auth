"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const db_config_1 = require("../config/db.config");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(db_config_1.config.DB, db_config_1.config.USER, db_config_1.config.PASSWORD, {
    host: db_config_1.config.HOST,
    dialect: "mysql",
    pool: {
        max: db_config_1.config.pool.max,
        min: db_config_1.config.pool.min,
        acquire: db_config_1.config.pool.acquire,
        idle: db_config_1.config.pool.idle
    }
});
exports.db = {};
exports.db.Sequelize = sequelize_1.Sequelize;
exports.db.sequelize = sequelize;
exports.db.user = require("../models/user.model")(sequelize, sequelize_1.Sequelize);
exports.db.role = require("../models/role.model")(sequelize, sequelize_1.Sequelize);
exports.db.role.belongsToMany(exports.db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
exports.db.user.belongsToMany(exports.db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
exports.db.ROLES = ["user", "admin", "moderator"];
//# sourceMappingURL=index.js.map