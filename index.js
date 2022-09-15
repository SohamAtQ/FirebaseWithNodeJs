const { async } = require("@firebase/util");
const e = require("express");
const express = require("express");
const app = express();
const admin = require("firebase-admin");
const credentials = require("./fir-withnode-5906d-firebase-adminsdk-x6yfd-e17c06a162.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//todo test end-point
app.get("/", (req, res) => {
    res.send(`<h1>Hi</h1>`);
});

//todo post data
app.post("/create", async (req, res) => {
    try {
        const id = req.body.email;
        const user = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        const userResponse = db.collection("users").add(user);
        res.send(userResponse);
    } catch (err) {
        res.send(err);
    }
});

//todo get all data
app.get("/read/all", async (req, res) => {
    try {
        const userRef = db.collection("users");
        const response = await userRef.get();
        let responseArr = [];
        response.forEach((doc) => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (err) {
        res.send(err);
    }
});

//todo get one id
app.get("/read/:id", async (req, res) => {
    try {
        const userRef = db.collection("users").doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
    } catch (error) {
        res.send(error);
    }
});

//todo update data
app.post("/update", async (req, res) => {
    try {
        const newFName = "Jess";
        const userRef = await db.collection("users").doc(req.params.id).update({
            firstName: newFName,
        });
        res.send(userRef);
    } catch (error) {
        res.send(error);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
