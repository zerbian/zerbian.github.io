function loadJSON(filename, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', filename, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") callback(xobj.responseText);
    }
    xobj.send(null);
}

function loadCircuit(id, filename) {
    loadJSON(filename, res => {
        var json = JSON.parse(res);
        var cir = new digitaljs.Circuit(json);
        var can = cir.displayOn($('#' + id));
        cir.start();
    });
};

var circuits = [
    {"id":"c1", "path": "./circuits/broken.json"},
    {"id":"c2", "path": "./circuits/clb.json"}
];

circuits.forEach(value => {
    loadCircuit(value.id, value.path);
});
