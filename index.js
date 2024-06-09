const express = require("express");
const dotEnv = require("dotenv");
const cors = require('cors') 
const userRoute = require("./routes/users");
// const postRoute = require("./routes/posts");


//initializing app
const app = express();

app.use(cors())
app.options('*', cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//defining URI key
dotEnv.config();


app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);

const PORT = 5000;
app.listen(PORT, () => {
	console.log("Starting server at http://localhost:5000")

})
