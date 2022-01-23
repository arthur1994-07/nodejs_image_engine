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


function incrementPage() {

}

// image search unsplash API
app.get("/unsplash", (req, res) => {
    var searchTerm = req.query.searchterm;
    var currentPage = req.query.page;
    console.log(searchTerm);
    var url = "https://api.unsplash.com/search/photos?client_id=SZOLItfHnhRLcZ5nOEjAQLVCquHux6H88dY-g3jRxec&query=";
    request(url + searchTerm + "&page=" + currentPage, (error, response, body) => {
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
    request(url + searchTerm + "&page=" + currentPage, (error, response, body) => {
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

// image search combined API
// app.get("/images", (req, res) => {
//     var searchTerm = req.query.searchterm;
//     var currentPage = req.query.page;
//     console.log(searchTerm);
//     var unsplashURL = "https://api.unsplash.com/search/photos?client_id=SZOLItfHnhRLcZ5nOEjAQLVCquHux6H88dY-g3jRxec&query=";
//     var pixabayURL = "https://pixabay.com/api/?key=25371850-57bead953a2128cdae909b4d5&q=";
//     request(unsplashURL + searchTerm + "&page=" + currentPage, (error, response, body) => {
//         if (error) {
//             console.log("Error!!!!!!");
//         } else {
//             res.render("images", { 
//                 picData: JSON.parse(body),
//                 pageNumber: currentPage,
//                 searchterm: searchTerm
//             });
//         } 
//     });
//     request(pixabayURL + searchTerm + "&page=" + currentPage, (error, response, body) => {
//         if (error) {
//             console.log("Error!!!!!!");
//         } else {
//             res.render("image", { 
//                 picData: JSON.parse(body),
//                 pageNumber: currentPage,
//                 searchterm: searchTerm
//             });
//         } 
//     });
// });



app.get("/search", (req, res) => {
    res.render("search");
});

app.listen("3000", () => {
    console.log("listen function");
});



