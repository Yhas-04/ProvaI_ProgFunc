const fs = require("fs")
const vendas = fs.readFile('vendas.json', (err, data)=> {
    if(err){
        console.log(err)
        return
    } 
})

const vendas2 = [1,2,250,1,250,2,2]

const resultado = vendas.valor.filter(cat => cat === 250);

console.log(resultado)