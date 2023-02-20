const { postUsers, getUsers, deleteAllUsers } = require("../controller/user.controller");
const router = require("express").Router();



//route to add new 100 users from external api and to store it in our database

router.post("/fetchUsers", postUsers)

router.get("/usersDetails", getUsers)

router.delete("/deleteUsers", deleteAllUsers)


module.exports = router;