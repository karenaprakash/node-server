    const express = require('express');
    const app = express();
/*------- built in module of node.js for access query from url --------------*/
    const querystring = require('querystring');
    //get method  : html
    app.get('/',(req,res)=>{
        res.send(
            `
            <html>
                <body>
                    <div>Prakash</div>
                </body>
            </html>
            `
        )
    })
    //get method : json
    app.get('/api/user',(req,res)=>{
        res.send(
            {
                name : 'Prakash',
                cars : ['Scoda','Ford','Oddi']
            }
        )
    })
    //get method : params
    app.get('/api/:user/:id',(req,res)=>{
        let name = req.params.user;
        let id = req.params.id;
        res.send(
            `<html>
                <body>
                    user id is ${id} and name is ${name}.
                </body>
            </html>
            `
        )
    })
    //get method : query string  req = http://localhost:3000/api/car?brand=ford&year=2019
    app.get('/api/car',(req,res)=>{
        let brand = req.query.brand;
        let year = req.query.year;

        res.send({
            brand,
            year
        })
    })


    const port = process.env.PORT || 3000
    app.listen(port);