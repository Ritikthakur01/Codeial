const express=require('express');
const port=8000; // when we are in  production level there ,we use port no 80.
const app=express();
const db=require('./config/mongoose')
const cookies=require("cookie-parser")
const expresslayout=require("express-ejs-layouts") // requiring express-ejs-layouts for setting layout
//used session cookies
const session=require('express-session');
const passport=require('passport');
const passport_local=require('./config/passport-local')
const MongoStore=require('connect-mongo')

const flash=require("connect-flash")
const modifiedMware=require("./config/middelware")

// for compiling sass into css file in middelware
// const sassMiddelware=require('sass-middleware')

// app.use(sassMiddelware({
//     src:"./assets/sass"
//     , dest: "./assets/css"
//     , debug: true
//     , outputStyle: 'extended'
//     , prefix:"/css"
// })) 


// using expresslayout before hiting routes
app.use(expresslayout)

// use parser for getting data from sent resquest
app.use(express.urlencoded())

// using cookies
app.use(cookies())


app.use('/uploads',express.static(__dirname+"/uploads"))

// extract style and script
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set ejs (veiw engine)
app.set('view engine','ejs');
//defining path here
app.set('views','./views');

app.use(express.static('assets'))

//use session and passport
//store session data in a mongo db with the help of connect-mongo (mongoStore),So that when server restarts users will remains login.
app.use(session({
    name:'codeial',
    //Todo change secret value in the production mode
    secret:'wgyhbjbjhbkjm',
    saveUninitialized:false,  //whenever  their is a req or session which is not initailse (user identity is not etablish ) , do i svae their data in session cookies / NOT 
    resave:false,  //user identity is  etablish , do i save their data again and again in session cookies / NOT 
    cookie:{
        maxAge:(1000*60*100),
        httpOnly:true
    },
    store:MongoStore.create({
        mongooseConnection: db, 
        autoRemove:"disabled",
        mongoUrl:'mongodb://127.0.0.1:27017/Codial_db'
    }, 
        function(err){
            console.log(err||"MongoStore connect successfully")
        }
    )
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUserforView)
// flash messages stores in session when we refreash the flash goes out
app.use(flash())
app.use(modifiedMware.setflash)


// use express route.
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.error(`error found i.e. ${err}`);
    }
    console.log(`Successfully server start at port: ${port}`)
})