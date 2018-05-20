const express = require('express');
const getRandomId = require('../tools/random_id')

const router = express.Router();

rooms = [];
idx_room = 0;

function giveRoom(id) {
    if (rooms.length > 0 && rooms[rooms.length - 1]["players"].length < 2) {
        rooms[rooms.length - 1]["players"].push(id)
    } else {
        rooms.push({
            'id_room': idx_room,
            'players': [id]
        })
        idx_room++;
    }
}

function findRoom(id) {
    id_room = -1
    rooms.forEach(room => {
        if (room["players"].includes(id) == true) {
            id_room = room["id_room"];
        }
    });
    return id_room;
}

router.get("/access", (req, res) => {
    id = getRandomId();
    giveRoom(id);
    res.send({
        "id": id
    });
})

router.get("/enter_room/:id_player", (req, res) => {
    id_room = findRoom(req.params.id_player)
    if (id_room != -1 && rooms[id_room]["players"].length == 2)
        response = {'status':'ok'};
    else
        response = {'status':'waiting'};
    res.send({
        response
    });
})

router.get("/choose_faction/:id_player/:id_faction", (req, res) => {
    res.send({});
})

router.get("/begin/:id_player", (req, res) => {
    res.send({});
})

router.get("/play/:id_player", (req, res) => {
    res.send({});
});

module.exports = router;