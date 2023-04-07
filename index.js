const express=require('express');
const port=8000; // when we are in  production level there ,we use port no 80.

const app=express();

//set ejs (veiw engine)
app.set('view engine','ejs');
//defining path here
app.set('views','./views');


// use express route.
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.error(`error found i.e. ${err}`);
    }
    console.log(`Successfully server start at port: ${port}`)
})