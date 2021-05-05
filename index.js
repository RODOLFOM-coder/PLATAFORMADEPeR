const express = require("express");
const app = express();

//estou dizendo para o Express usar o ejs como viem engine
app.set('view engine','ejs');
app.use(express.static('public')); //pastas aonde ficam os arquivos estaticos.

app.get("/",(req, res) => {
 
    res.render("index");
 
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
})

app.listen(8080,()=>{
    console.log("APP RODANDO!!!");
});