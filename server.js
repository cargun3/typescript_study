'use strict';   // strict mode 로 문법 검사를 하겠다는 선언

var server = require('./dist/server/server');
var debug = require('debug')('express:server');
var http = require('http');

// 서버 생성
var httpPort = 8080;
var app = server.Server.bootstrap().app;
app.set('port', httpPort);
var httpServer = http.createServer(app);
httpServer.listen(httpPort);

// Error Handler 등록
httpServer.on('error', onError);

// Server Binding 등록
httpServer.on('listening', onListening);

// Error Handler
function onError(error) {
    if(error.syscall !== 'listening') {
        throw error;
    }

    var bind = typeof httpPort === 'string' ? 'Pipe : ' + httpPort : 'Port : ' + httpPort;

    switch(error.code) {
        case 'EACCESS' : 
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINSUE' :
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Server Binding Handler
function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === 'string' ? 'Pipe : ' + addr : 'Port : ' + addr.port;
    console.info('Listening on ' + bind);
}