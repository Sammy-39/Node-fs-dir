const fs = require("fs")
const path = require("path")
const http = require('http')
const port = process.env.PORT || 3000

const folderPath = __dirname

const dataList = []

try{
    if(fs.existsSync(folderPath)){
        fs.readdir(folderPath,(err,data)=>{
            if(err) throw err
            data.forEach(item=>{
                item = path.join(folderPath,item)
                if(fs.statSync(item).isDirectory())
                    dataList.push(`${item} -->  Directory`)
                if(fs.statSync(item).isFile())
                    dataList.push(`${item} -->  File`)
            })
            const httpServer = http.createServer((req,res)=>{
                res.writeHead(200,{"Content-Type": "text/html"})
                res.write('<h4> Reading directory content: ../node-fs-dir </h4>')
                res.write('<ul>')
                dataList.map((op)=>res.write(`<li> ${op} </li>`))
                res.write('</ul>')
                res.end()
            })
            httpServer.listen(port)
        })
    }
    else{
        console.log("Directory does not exists")
    }

}
catch(err){
    console.log(err)
}

