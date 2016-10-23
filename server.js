const express = require('express');
const bodyParser = require('body-parser');
const { API_SERVER: { HOST, PORT }, PATHS: { BUILD } } = require('./config');

let data = {
    "projects": [
        { name: "one",   id: 1},
        { name: "two",   id: 2},
        { name: "three", id: 3},
        { name: "four", id: 4},
        { name: "five", id: 5}
    ],
    "tasks": [
        {
            "projectId": 2,
            "title": "FIRST TASK",
            "text": "text",
            "id": 1
        },
        {
            "projectId": 2,
            "title": "SECOND TASK",
            "text": "text",
            "id": 2
        },
        {
            "projectId": 2,
            "title": "THIRD TASK",
            "text": "text",
            "id": 3
        },
        {
            "projectId": 2,
            "title": "FOURTH TASK",
            "text": "text",
            "id": 4
        }
    ]
};

express()
    .use( express.static( BUILD ) )
    .use( bodyParser.json() )

    .get( '/api/data', (req, res)=> setTimeout( ()=> { res.json( data ) }, 200 ))

    .post( '/api/data', (req, res)=> res.json( data = req.body ) )

    .get( '*', (req, res)=> res.sendFile( `${ BUILD }/index.html`  ) )

    .listen( PORT, ()=>
        console.log(`Server started at http://${ HOST }:${ PORT }`)
    );
