const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const pergunta = require("./database/Pergunta.js");
const Resposta = require("./database/Resposta.js");
//database 

connection
    .authenticate()
    .then(() => {
        console.log("conexão feita!!!!!!!!");
})
.catch((msgErro) => {
    console.log("msgErro");
})

//estou dizendo para o Express usar o ejs como viem engine
app.set('view engine','ejs');
app.use(express.static('public')); //pastas aonde ficam os arquivos estaticos.

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req, res) => {
    pergunta.findAll({raw: true, order:[["id","DESC"]] }).then(pergunta => {
        res.render("index",{
            pergunta: pergunta
        });
    });
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
res.redirect("/");
    });
});

app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){

         Resposta.findAll({
             where: {perguntaId: pergunta.id},
             order: [ ['id', 'DESC'] ]
         }).then(respostas => {
            res.render("pergunta", {
                pergunta: pergunta,
                respostas: respostas
            }); 
         });       
    }else{
        res.redirect("/");
     }

    });
});

app.post("/responder", (req, res) => {
var corpo = req.body.corpo;
var perguntaId = req.body.pergunta;
Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
    }).then(() => {
res.redirect("/pergunta/"+perguntaId);
   });

});

app.listen(8082,()=>{
    console.log("APP RODANDO!!!");
});