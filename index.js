const express=require('express');
const port=8000; // when we are in  production level there ,we use port no 80.

const app=express();

const db=require('./config/mongoose')

const cookies=require("cookie-parser")

// requiring express-ejs-layouts for setting layout
const expresslayout=require("express-ejs-layouts")

// using expresslayout before hiting routes
app.use(expresslayout)

// use parser for getting data from sent resquest
app.use(express.urlencoded())

// using cookies
app.use(cookies())

// extract style and script
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set ejs (veiw engine)
app.set('view engine','ejs');
//defining path here
app.set('views','./views');

// use express route.
app.use('/',require('./routes'));

app.use(express.static('assets'))

app.listen(port,function(err){
    if(err){
        console.error(`error found i.e. ${err}`);
    }
    console.log(`Successfully server start at port: ${port}`)
})