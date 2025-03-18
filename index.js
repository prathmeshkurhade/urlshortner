const express  = require('express');
const path = require('path')
const {connectToMongoDB} = require("./connect")
const app = express();
const PORT = 8001;
const URL = require('./models/url');
const cookieParser = require('cookie-parser')
const restrictTologgedinuseronly = require('./middleware/auth');

const UserRoute = require('./routes/user')
const staticRoute = require('./routes/staticRouter')
const urlRoute = require("./routes/url");

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('Mongodb connected'))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended : "false"}));
app.use(cookieParser());

 // Adjust the path if needed

app.use("/url", restrictTologgedinuseronly, urlRoute);
app.use('/', staticRoute)
app.use('/user', UserRoute)

// app.get('/:shortId', async (req,res) => {
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate({
//         shortId,
//     }, { $push: {
//         visitHistory: {
//             timestamp: Date.now(),
//         },
//     }}
    
// );
//     res.redirect(entry.redirectURL)
// })
app.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;
    const entry = await URL.findOne({ shortId });

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => console.log(`Server Started At PORT:${PORT}`));      