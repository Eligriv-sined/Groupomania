const express = require('express');
const bdd = require("./configbdd/bdd");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comments");
const path =  require("path");
const bodyParser = require('body-parser');
app.use(express.json());



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //accéder à notre API depuis n'importe quelle origine 
    res.setHeader( //ajouter les headers mentionnés aux requêtes envoyées vers notre API 
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(//envoyer des requêtes avec les méthodes mentionnées
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

app.use('/api/user',userRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/like',likeRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

module.exports = app;

