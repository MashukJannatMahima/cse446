const router = require("express").Router();
const { writeDataIntoFile } = require("../services/commonActions")




// User Registration
router.post("/register", async ( req, res) => {
	try {
		const newUserObj = {
			username: req.body.username,
			email: req.body.email,
			pin: req.body.pin,
		}

		const dbName = 'user'
		const user = await writeDataIntoFile( newUserObj, dbName )

		res.status(200).json(user)

	} catch (err) {
		res.status(500).json(err);
	}
})



module.exports = router;