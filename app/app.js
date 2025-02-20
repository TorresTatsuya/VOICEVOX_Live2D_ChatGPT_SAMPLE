const create = require("./generateVoice.js");
const path = require("path");
const bodyParser = require("body-parser");
const { getChatGPTResponse } = require("./chatGpt.js");
const express =require("express");
const app = express();

app.set("view engine", "ejs");
app.use( bodyParser.json() );

//static
app.use("/", express.static("./public"));

//dynamic
app.get("/home", (req, res) => {
    res.render( path.join(__dirname, "./index.ejs") );
  });

//post
app.post("/synthesize", async(req, res)=>{
    console.log("リクエストされました");
    const text = req.body.text;
    const responseMsg = await getChatGPTResponse(text);
    await create(responseMsg);
    res.json({
        success: true,
        audioUrl: "audio.wav",
        msg: responseMsg,
    });
})

//listen
app.listen(process.env.WEB_PORT, () => {
    console.log("lsiten at " + WEB_PORT);
})
