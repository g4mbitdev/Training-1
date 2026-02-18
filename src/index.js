const express = require('express');
const app = express();

app.get('/hello', function(req, res){
   res.send("Hello world!");
});

app.post('/hello', function(req, res){
   res.send("Hello World post method was requested");;

});;

app.listen(3000);