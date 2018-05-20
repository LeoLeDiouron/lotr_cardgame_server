const faction = [{
    "capitale": "001",
    "gold": ["002", "003"],
    "silver": ["004", "005"],
    "bronze": ["006", "007"]
}]

class CardManager {

    constructor() {
        this.players = []
    }

    createDeck(id_player, id_faction) {
        var player = {
            "id_player": id_player
        };
        player["deck"] = this.loadDeck(id_faction)
        this.players.push(player)
    }

    loadDeck(id_faction) {
        return faction[id_faction];
    }

    dispAllPlayers() {
        this.players.forEach(player => {
            console.log(player);
        })
    }

}

exports.CardManager = CardManager;