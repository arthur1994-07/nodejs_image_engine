var port = process.env.PORT || 3000;
express = require("express");
request = require("request");
app = express();

var async = require("async");

app.set("view engine", "ejs");

var unsplashUrl = {
    url : "https://api.unsplash.com/search/photos?client_id=SZOLItfHnhRLcZ5nOEjAQLVCquHux6H88dY-g3jRxec&query="
}

var pixabayUrl = {
    url : "https://pixabay.com/api/?key=25371850-57bead953a2128cdae909b4d5&q="
}

