const express = require('express');
const getRandomId = require('../tools/random_id')
const CardManager = require("../controller/card_manager").CardManager;
const RoomManager = require("../controller/room_manager").RoomManager;

const router = express.Router();
var card_manager = new CardManager();
var room_manager = new RoomManager();

// return the id of the player, used by him for each request, like an access token, and give him a room
router.get("/access", (req, res) => {
    id_player = getRandomId();
    room_manager.giveRoom(id_player);
    res.send({
        "id": id_player
    });
})

// send ok if the 2 players have selected their factions, else, send waiting
router.get("/enter_room/:id_player", (req, res) => {
    res.send(room_manager.chooseDone(req.params.id_player));
})

// get the id of the facion selected by the player, and push a new deck of this faction into the card_manager (linked with the player)
router.get("/choose_faction/:id_player/:id_faction", (req, res) => {
    room_manager.giveFaction(req.params.id_player, req.params.id_faction);
    card_manager.createDeck(req.params.id_player, req.params.id_faction);
    card_manager.dispAllPlayers();
    res.send({
        'status': 'ok'
    });
})

// send ok if the 2 players are in the room, else, send waiting
router.get("/begin/:id_player", (req, res) => {
    res.send(room_manager.roomDone(req.params.id_player));
})

router.get("/play/:id_player", (req, res) => {
    res.send({});
});

module.exports = router;