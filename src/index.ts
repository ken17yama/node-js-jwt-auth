import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { authRoute } from './routes/auth.route'
import { userRoute } from './routes/user.route'

const app = express();

var corsOptions = {
	origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

// 既存のテーブルを削除して、再度DBを同期する
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and Resync Db');
// 	initial();
// });

app.get("/", (req, res) => {
	res.json({ message: "Welcome to bezkoder application." });
});

authRoute(app);
userRoute(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

function initial() {
	Role.create({
		id: 1,
		name: "user"
	});

	Role.create({
		id: 2,
		name: "moderator"
	});

	Role.create({
		id: 3,
		name: "admin"
	});
}
