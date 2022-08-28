const express = require('express');
const cors = require('cors')
const path=require('path');
const user = require('./src/model/model');
const nodemailer = require('nodemailer');
// const exphbs=require('express-handlebars');

const app=express();
app.use(cors());
app.use(express.json({urlencoded:true}));

app.use(express.static('dist/frontend'));


app.post('/email',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Method:GET,POST,PUT,DELETE")
    const randomPin = Math.floor(1000 + Math.random() * 9000);
    var data ={
     email : req.body.email,
     otp:randomPin
    }
    var authdb = new user(data)
    authdb.save().then((data)=>{
   
     var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'diwaliwishestoyou@gmail.com',
          pass: 'ppplcytemtgtagtq'
      }
   });
   
   var mailOptions = {
      from: 'diwaliwishestoyou@gmail.com',
      to: data.email,
      subject: 'OTP',
      text: `OTP is ${data.otp}`
   
   };

   transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    } else {
        console.log('email send:'+info.response);
    }
 });
   
   console.log(data)
  res.send(data)
  }
   )
 
 })
 
 app.post('/otp',(req,res)=>{
   var data = {
     email:req.body.email,
     otp:req.body.otp
 }
 user.findOne({email:data.email,otp:data.otp}).then((data)=>{
  if (data != null ){
   console.log("otp verify",data)
   res.send(data)
  }
  else{
 res.send(null)
  }
  
 })
 })

//  app.get('/*', (req, res)=> {
//     res.sendFile(path.join(__dirname + '/dist//frontend/index.html'))})

// app.engine('handlebars',exphbs({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ "}));
// app.set('view engine','handlebars');

// app.use(bodyparser.urlencoded({extended : false}));
// app.use(bodyparser.json());

// app.use('/public',express.static(path.join(__dirname, 'public')));

// app.get('/',function(req,res){
//     res.send("Node.js 2 way authnetication");
// });

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})