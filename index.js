const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/configure.js')
const Game = require('./src/game.js')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/game',(req, res) => {
  Game.join(req.query.token)
  .then(game => {
      res.send(game)
    })
  .catch(error => console.error(error))
})

app.post('/game', (req, res) => {
  Game.create(req.body)
    .then(game => {
      res.send(game)
    })
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})


/*
  POST /game
  {
    "rows":
    "columns"
  }

  {
    "gameId": "http://localhost:3000/game?token=asdfasdfw23",
    "playerId": "asdfasdfasdf"
  }
*/

//folders: game-service
//files: GameService.js
