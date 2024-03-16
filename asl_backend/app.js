import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import voice from "elevenlabs-node";
import express from "express";
import { promises as fs } from "fs";
import OpenAI from "openai";
import { exit } from "process";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};



app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const helpingVerbs = ["is","am","are","was","ware",
  "can",
  "could",
  "may",
  "might",
  "must",
  "shall",
  "should",
  "will",
  "would",
  "ought",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "being",
  "been",
];

  const resource = ["my", "name", "b", "c","r","m","u","a","d","e","f","g","z","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","come","family","get","good","hai","happy","hello","I","idle","knowledge","love","name","parents","sign","thanks","translator","very","will","you","your","where","please","hungry","bye"];
  const words = userMessage.split(' ');

  if (userMessage === "") {
    res.send({
      messages: [
        {
          text: "idle",
          animation: "idle",
          audio: "audio.mp3",
        },
      ],
    });
    return;
  }

  const foundWords = [];
  let letters = [];
  //const foundWords2 = [];
  words.forEach((word) => {
    if(word!="I"){
      word=word.toLowerCase();
    }
    if (resource.includes(word)) {
      console.log(word);
      foundWords.push({
        text: word,
        animation: word,
        audio: "audio2.mp3",
      });
    }
    else {
    // If word is not found in resource, split it into alphabets
    letters = word.split('');
    console.log(letters);
    letters.forEach((letter) => {
      console.log(letter);
      foundWords.push({
        text: letter,
        animation: letter,
        audio: "audio2.mp3", // You can set a different audio for individual letters if needed
      });
    });
  }
  });

  if (foundWords.length > 0) {
    res.send({ messages: foundWords });
  }
});

 

app.listen(port, () => {
  console.log(`Server started on port   ${port}`);
});
