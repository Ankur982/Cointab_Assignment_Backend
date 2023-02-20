const userModel = require("../models/userDetails.models");
const axios = require("axios");

const postUsers = async (req, res) => {
    let page = req.query.page;
    console.log(page)
    try {
        const { data } = await axios.get(`https://randomuser.me/api/?results=100&page=${page}`);

        console.log(data);

        const newUser = await userModel.insertMany(data.results)

        res.status(200).send({ status: "success", users: newUser })

    } catch (err) {

        res.status(500).send({ status: "error", message: err.message });

    }
};




const getUsers = async (req, res) => {

    let page = +(req.query.page);

    let gender = req.query.gender;

    let country = req.query.country;

    console.log(country)

    let skipUser = (page - 1) * 10;

    try {

        const allUsers = await userModel.find();
        let users;

        if (gender && country) {
            users = await userModel.find({
                $and: [{ "gender": gender }, { "location.country": country }]
            }).limit(10).skip(skipUser);

        } else if (gender) {
            users = await userModel.find({ "gender": gender }).limit(10).skip(skipUser);
        }
        else if (country) {
            users = await userModel.find({ "location.country": country }).limit(10).skip(skipUser);
        }
        else {
            users = await userModel.find().limit(10).skip(skipUser);
        }
        res.status(200).send({ status: "success", users: users, totalusers: allUsers.length });

    } catch (err) {

        res.status(500).send({ status: "error", message: err.message });

    }
};



const deleteAllUsers = async (req, res) => {

    try {

        await userModel.deleteMany();

        res.status(200).send({ status: "success" });

    } catch (err) {

        res.status(500).send({ status: "error", message: err.message });

    }
};





module.exports = { postUsers, getUsers, deleteAllUsers };