var mongo=require('mongodb').MongoClient;
var db_url=process.env.PROD_DB||'mongodb://localhost:27017/';

function encode(number) { //convert number to base-62
var _alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
if (number===0) {return 0;}
var a = [];
while (number > 0) {
a.push(_alphabet[number%62]);
number = Math.floor(number / 62);
}
return a.join('');
}

function addUrl(url,callB) {
mongo.connect(db_url, function(err, db){
if (!err) {
db.collection('addrz').findOne({'url':url}, function(err,data) {
if (data==null) {
db.collection('addrz').save({url:url,shrt:null},function(err, data){
var encID=encode(String((data['ops'][0]['_id'])).replace(/[A-Za-z]+/g,'')); //remove spaces
db.collection('addrz').update({url:url},{$set:{shrt:encID}});
callB(encID);
}); }
else { // we already have the shortened URL
callB(data.shrt);
}
});
}}
);}

var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var validURL=require('valid-url');
var app=express();
app.use(express.static('/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/:addy',function(req,res) { 
mongo.connect(db_url, function(err, db) { if(!err) {
db.collection('addrz').findOne({'shrt':req.params.addy}, function(err,data) {
if(data==null){res.send({"error":req.params.addy+ ' is not a valid shortened URL. Please try again.'});}
else { res.redirect(data.url); res.end();}
});
}});});

app.get('/submit/:addy', function(req,res) {
if (validURL.isUri(req.params.addy)) {
addUrl(req.params.addy,function(encID){
//JSON response:
res.send({"original_url":req.params.addy,"short_url":'https://uri-shorty.herokuapp.com/'+encID});
//verbose repsonse: (i.e., non-JSON) res.send('Your shortened URL is <a href="https://uri-shorty.herokuapp.com/'+encID+'">https://uri-shorty.herokuapp.com/'+encID+'</a>. looks good brah!');
});}
else { res.send({"error":"Invalid URL. Please check your format and try again."}); } //invalid URL
});
app.get('*', function(req,res){res.sendFile(path.join(__dirname, 'index.html'));});
app.listen(process.env.PORT||8080,function(){console.log('sup brah im listening brah');});
