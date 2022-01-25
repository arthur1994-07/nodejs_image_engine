const express = require("express");
const app = express();
const request = require("request");
const catMe = require("cat-me")

app.use(express.static("public"));

app.set("view engine", "ejs");


console.log(catMe());

// home page
app.get("/", (req, res) => {
    res.render("home");
});

// test route 
app.get("/hello", (req, res) => {
    console.log(req);

    res.send("Hello route");
});

// game page
app.get("/game/:gameTitle/:gameAuthor" , (req, res) => {
    const title = req.params.gameTitle;
    const author = req.params.gameAuthor;
    const year = "2022";

    res.render("game",  {
        title : title,
        author: author,
        year: year
    });
})

// game list page
app.get("/list", (req, res) => {
    const games = [
        { title: "League of Legends" , creator: "Riot Games"} ,
        { title: "Apex Legend", creator: "EA Originals"},
        { title: "Fifa", creator: "EA Sports"},
        { title: "GTA", creator: "Rocket Game"},
        { title: "Counter Strike", creator: "Nexon"}
    ]
    res.render("list", {
        games: games
    })
})


// image search unsplash API
app.get("/unsplash", (req, res) => {
    var searchTerm = req.query.searchterm;
    var currentPage = req.query.page;
    console.log(searchTerm);
    var url = "https://api.unsplash.com/search/photos?client_id=SZOLItfHnhRLcZ5nOEjAQLVCquHux6H88dY-g3jRxec&query=";
    const unsplashRequest = request(url + searchTerm + "&page=" + currentPage, (error, response, body) => {
        if (error) {
            console.log("Error!!!!!!");
        } else {
            res.render("unsplash", { 
                picData: JSON.parse(body),
                pageNumber: currentPage,
                searchterm: searchTerm
            });
        } 
    })
});

// image search Pixabay API
app.get("/pixabay", (req, res) => {
    var searchTerm = req.query.searchterm;
    var currentPage = req.query.page;
    console.log(searchTerm);
    var url = "https://pixabay.com/api/?key=25371850-57bead953a2128cdae909b4d5&q="
    const pixabayRequest = request(url + searchTerm + "&page=" + currentPage, (error, response, body) => {
        if (error) {
            console.log("Error!!!!!!");
        } else {
            res.render("pixabay", { 
                picData: JSON.parse(body),
                pageNumber: currentPage,
                searchterm: searchTerm
            });
        } 
    })
    
});

app.get("/pixabaySearch", (req, res) => {
    res.render("pixabaySearch");
});

app.get("/unsplashSearch", (req, res) => {
    res.render("unsplashSearch");
});




var server = app.listen("3000", () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listen function: "+ host+" "+port);
});



