export const allAccess = (req, res) => {
	res.status(200).send("Public Content.");
	console.log(res);
};

export const userBoard = (req, res) => {
	res.status(200).send("User Content.");
	console.log(res);
};

export const adminBoard = (req, res) => {
	res.status(200).send("Admin Content.");
	console.log(res);
};

export const moderatorBoard = (req, res) => {
	res.status(200).send("Moderator Content.");
	console.log(res);
};
