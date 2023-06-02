const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to CORS server!");
});

app.get("/peoples", (req, res) => {
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Headers', 've');  
  res.set('Access-Control-Allow-Methods', 'GET,POST');    
  res.set('Access-Control-Allow-Origin', '*');
  res.json([
    { id: "1", name: "George Eliot", IsRegistered: true },
    { id: "2", name: "Bob Smith", IsRegistered: false },
    { id: "3", name: "Joe Smith", IsRegistered: false },
    { id: "4", name: "Kat Smith", IsRegistered: false },
    { id: "5", name: "Kong Smith", IsRegistered: false },
  ]);
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
