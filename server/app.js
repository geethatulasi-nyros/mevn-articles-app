var express=require('express')
var path=require('path')
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var cors=require('cors')
  var routes=require('./routes/article.routes')

mongoose.connect('mongodb://localhost:27017/articles-app',{useNewUrlParser:true});
var db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",(callback)=>{
	console.log("mongodb connection successful");
});

var app=express();
var port=5000;

app.use(cors());
app.use(express.static(path.join(__dirname,'images')));
app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

 app.use(routes);
app.listen(port,function(){
	console.log("server started on port " + port)
});

module.exports=app;
