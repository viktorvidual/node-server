// const http = require("http")
// const fs = require("fs")
// const _ = require("lodash")

// const server = http.createServer((req, res) => { 
//     // lodash
//     const num = _.random(0, 20)
//     console.log("number", num);

//     const greet = _.once(() => { 
//         console.log("hello");
//     }) 
    
//     greet()
//     greet()
    
//     let path = "./views"

//     switch(req.url){
//         case "/":
//             res.statusCode = 200
//             path += "/index.html"
//             break;
//         case "/about":
//             res.statusCode = 200
//             path += "/about.html"
//             break;
//         case "/about-me":
//             res.statusCode = 301
//             res.setHeader("Location", "/about")
//             res.end();
//             break;
//         default:
//             res.statusCode = 404
//             path += "/404.html"
//             break;
//     }

//     res.setHeader("Content-Type", "text/html")

//     fs.readFile(path, (err, data) => { 
//         if(err){
//             console.log(err)
//         }
//         res.end(data)
//     })

// })

// server.listen(3000, "localhost", () => { 
//     console.log("Server is running on http://localhost:3000")
//     console.log("Press Ctrl+C to stop the server")
// })