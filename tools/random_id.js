const ID_MAX = 1000000;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomId() {
    random = getRandomInt(ID_MAX)
    id = "";
    tmp_id_max = ID_MAX;
    while (tmp_id_max / 10 > random) {
        id += "0";
        tmp_id_max /= 10;
    }
    id += random.toString();
    return id;
}

module.exports = getRandomId;