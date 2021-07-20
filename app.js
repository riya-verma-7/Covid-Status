const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const api = require('novelcovid');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

api.settings({
    baseUrl: 'https://disease.sh'
})

app.get("/", function (req, res) {
    api.countries().then(function (response) {
        res.render("home", { info: response });
        console.log(response);
    })

})
app.post("/",function(req,res){
    let searched=req.body.val;
  
        api.countries({country:`${searched}`}).then(function(response){
            console.log(response);
        res.render("search",{info:response})

    // }) ;
    })

})


app.listen(3000, function () {
    console.log("Server started on port 3000");
});