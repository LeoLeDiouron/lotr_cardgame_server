class RoomManager {

    constructor() {
        this.rooms = [];
        this.idx_room = 0;
    }

    // put player into a room
    giveRoom(id_player) {
        if (this.rooms.length > 0 && this.rooms[this.rooms.length - 1]["players"].length < 2) {
            this.rooms[this.rooms.length - 1]["players"].push(id_player);
        } else {
            this.rooms.push({
                'id_room': this.idx_room,
                'players': [id_player],
            })
            this.idx_room++;
        }
        this.rooms[this.rooms.length - 1][id_player.replace("'", "")] = {};
        //console.log(this.rooms);
    }

    // return the id of the room where is the player
    findRoom(id_player) {
        var id_room = -1
        this.rooms.forEach(room => {
            if (room["players"].includes(id_player) == true) {
                id_room = room["id_room"];
            }
        });
        return id_room;
    }

    // give selected faction to the player
    giveFaction(id_player, id_faction) {
        this.rooms[this.findRoom(id_player)][id_player]["faction"] = id_faction;
    }

    // check if there are 2 players in the room
    roomDone(id_player) {
        var response = {
            'status': 'waiting'
        };
        id_room = this.findRoom(id_player)
        if (id_room != -1 && this.rooms[id_room]["players"].length == 2) {
            response = {
                'status': 'ok'
            };
        }
        return response;
    }

    // check if the 2 players of a room have choose their faction
    chooseDone(id_player) {
        var room = this.rooms[this.findRoom(id_player)]
        var response = {
            'status': 'ok'
        };
        room["players"].forEach(id_player => {
            if (!"faction" in room[id_player])
                response = {
                    'status': 'waiting'
                };
        })
        return response;
    }
}

exports.RoomManager = RoomManager;