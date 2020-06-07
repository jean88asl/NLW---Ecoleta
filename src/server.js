const express = require("express")
const server = express()

//Importaando o DB
const db = require("./database/db") 

//configurando pasta publica
server.use(express.static("public"))

//habilitando o req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando o template engie
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurando rotas
server.get("/", (req, res) =>{
    return res.render("index.html")
})

server.get("/create-point", (req, res) =>{
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) =>{
    //inserindo dados na DB:
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);   
    `    
    const values = [
        req.body.image, 
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    // Não utilizar arrow nesse tipo de função pois o this vai apontar para outro lugar.
    function afterInsertData(err) {
        if(err){
            console.log(err)
            return res.send("Erro ao realizar cadastro, favor verifique os dados informados") 
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData) //<- os dados são inseridos aqui

})

server.get("/search", (req, res) =>{

    const search = req.query.search

    if(search === ""){
        //Pesquisa vazia 
        return res.render("search-results.html", { total: 0 })
    }


    // Pegando os dados no banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){ // detalhe para aspas simples onde está sendo enviado o dado se não ele pode ser apresentado algum erro
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão os registros da tabela places:")
        console.log(rows)

        const total = rows.length

        //Mostrando a página Html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
    
})

//Servidor será ouvido na porta 3000
server.listen(3000)
