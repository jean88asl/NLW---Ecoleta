//Importando a dependência do sqlite3

const sqlite3 = require("sqlite3").verbose()

/*Inciar o objeto de banco quee irá fazer operações no banco de dados
e para criar o banco basta digitar node e o caminho do arquivo que comtém a configuração:
node src/database/db.js*/
const db = new sqlite3.Database("./src/database/database.db")

//exportando o as configurações do banco para que a aplicação possa utilizar as funcionalidade
module.exports = db

//utilizar o objeto de naco de dados, para as operações da página
db.serialize(() =>{
    //com comando sql é possível:

    //Criar uma tabela:
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    //inserindo dados
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);   
    // `    
    // const values = [
    //     "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
    //     "Papersider",
    //     "Ceilância Norte",
    //     "Quadra 10",
    //     "Distrito Federal",
    //     "Brasília",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ];

    // Não utilizar arrow nesse tipo de função pois o this vai apontar para outro lugar 
    // function afterInsertData(err) {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }

    //A função desse ser passada por parâmetro para não ser executada de forma automática
    //db.run(query, values, afterInsertData) //<- os dados são inseridos aqui
    //Feito os procedimentos acima é necessário rodas o comando node src/database/db.js
    
    //Consultar dados da tabela
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão os registros da tabela places:")
    //     console.log(rows)
    // })

    
    // Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [6], function(err){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Resgistro deletado com sucesso")
    // })

    
})