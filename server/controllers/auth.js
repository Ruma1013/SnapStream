import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Register user
export const register = async(req, res) => {
try {
    const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 1000),
        impressions: Math.floor(Math.random() * 1000)
    })
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
} catch (error) {
    res.status(500).json({error: error.message});
}
};

// logging in
export const login = async(req,res) => {
    try {
       const { email, password } = req.body;
       const user = await User.findOne({ email: email });
    if(!user) return res.status(400).json({msg: "User does not exist."});
    

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg: "Invalid credentials."});

    const token = jwt.sign({ id: user._id }, process.loadEnvFile.JWT_SECRET);
    delete user.password;
    res.status(200).json({ user, token });

    } catch (error) {
       res.status(500).json({error: error.message});
    }
}