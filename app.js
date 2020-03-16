const fs = require('fs');
const express = require('express')
BodyParser = require('body-parser');
const app = express()
const port = 45123

app.use(express.json());
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

app.use(express.static('.'));

app.get('/',function(req,res) {
  res.sendFile('wiki.html', { root: __dirname });
});

app.get('/wiki',function(req,res) {
  res.sendFile('wiki.json', { root: __dirname });
});

app.post('/wiki',function(req,res) {
  fs.writeFile(__dirname+'/wiki.json', JSON.stringify(req.body, null, 2), function(err) {
    if (err) throw err;
    console.log('The file has been saved!');
    res.send();
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));