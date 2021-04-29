const express = require("express");
const app = express();

//estou dizendo para o Express usar o ejs como viem engine
app.set('view engine','ejs');

app.get("/:nome/:lang",(req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirmsg = false;

    var produtos = [
        {nome: "Salgadinho",preco: 3.50},
        {nome: "Coca-Cola", preco: 5},
        {nome: "Leite", preco: 1.80}
    ]
    res.render("index", {
        nome: nome,
        lang: lang,
        site: "Perguntas e Respostas",
        msg: exibirmsg,
        produtos: produtos
    });
});

app.listen(8080,()=>{
    console.log("APP RODANDO!!!");
});