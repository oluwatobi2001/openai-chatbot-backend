const express = require("express");
const app = express();
const dotenv = require("dotenv")

const {Configuration, OpenAIApi} = require("openai"); 

const cors = require("cors")




dotenv.config();
app.use(express.json());
app.use(cors());



const configuration = new Configuration({
    organization: "org-wNe2gIo2qTQOCXMb3TCJLhtM",
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);







app.get("/" , (req, res) => {
res.status(200).send("hello, you are welcome to Tobistic")
});
app.post("/", async (req, res) => {
    try { const prompt = req.body.text;
      const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `${prompt}`,
          max_tokens: 3500,
          temperature: 0.9,
          top_p: 1,
          presence_penalty: 1.0,
          frequency_penalty: 1.3

      }); 
     res.status(200).json(response?.data.choices[0].text);


    }
    catch(err) {
        res.status(500).json(err)
    }
})
app.listen(process.env.PORT  || 5000, ()=> {
    console.log("tobi is king");
})

