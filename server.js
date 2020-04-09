"use strict";

var server = require("./dist/server/server");
var debug = require("debug")("express:server");
var http = require("http");

//Server Crate
var httpPort = 8884;
var app = server.Server.bootstrap().app;
app.set("port", httpPort);
var httpServer = http.createServer(app);
httpServer.listen(httpPort);

httpServer.on("error", onError);

function onError(error) {
    if(error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof httpPort === "string" ? "Pipe " + httpPort : "Port " + httpPort;

    switch(error.code) {
        case "EACCES" : 
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
    }

    function onListening() {
        var addr = httpServer.address();
        var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
        console.log("Listening on " + bind);
    }
}