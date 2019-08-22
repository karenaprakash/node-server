    const express = require('express');
    const app = express();
/*------- fs :  built in module of node.js for access filesystem  --------------*/
    const fs = require('fs');
/*------- body-parser :  npm install body-parser --save => to get data from form request  --------------*/
    const bodyParser = require('body-parser');  
    //middleware which containing request data in query string 
    const urlencodeParser = bodyParser.urlencoded({extended:false});
    //middleware which containing json request 
    const jsonParser = bodyParser.json();

/*------- built in module of node.js for access query from url --------------*/
    const querystring = require('querystring');
    app.use('/css',express.static(__dirname + '/public/css'))
        app.use('/',(req,res,next)=>{
                console.log('Some one made request for ' + req.url)
                res.cookie('cookiename','cookievalue')
                next()
        })

    //get method  : html with external stylesheet link
    app.get('/',(req,res)=>{
        res.send(
            `
            <html>
                <head>
                    <link type="text/css" rel="stylesheet" href="/css/styles.css">
                </head>
                <body>
                    <div>Prakash</div>
                </body>
            </html>
            `
        )
    })
    //include form : at 'api/newuser'
    app.get('/api/newuser',(req,res)=>{
        let HTML = fs.readFileSync(`${__dirname}/querystring_form.html`);
        res.send(`${HTML}`);
    })  

     //include form : at 'api/user_post'
     app.get('/api/user_post',(req,res)=>{
        let HTML = fs.readFileSync(`${__dirname}/jsonpost.html`);
        res.send(`${HTML}`);
    })  
    
    //post method : at '/enteruser'
    app.post('/enteruser',urlencodeParser,(req,res)=>{
        const firstName = req.body.firstname;
        const lastName = req.body.lastname;
        console.log(firstName);
        console.log(lastName);
        res.send(200)
    })
    //post method : at '/enteruser_post'
    app.post('/enteruser_post',jsonParser,(req,res)=>{
        //add middlewar( jsonParser ) at top which gives json data from req
        console.log(req.body);
        res.send(200)
        //now make request at 'api/user_post' it runs jsonpost.html > make ajax request to /enteruser_post and it returns json in console
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