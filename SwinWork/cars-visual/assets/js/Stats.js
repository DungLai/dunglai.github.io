window.stats = function (data) {
    var stats = {};
    
    document.getElementById("n_cars").innerHTML  = data.length;
    document.getElementById("n_vars").innerHTML  = Object.keys(data[0]).length;

    return stats;
}