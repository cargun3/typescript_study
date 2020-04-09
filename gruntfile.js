module.exports = function(grunt) {
    'use strict';
    var webpack = require('webpack');
    require('time-grunt')(grunt);
    var path = require('path');

    // 1. Project 구성
    grunt.initConfig({

        webpack: { // 각각의 task(plugin) name
            compile_client: {
                devtool: 'source-map',
                entry: ['./client/js'],
                output: {
                    path: path.resolve(__dirname, 'dist/client/js')
                },
                module: {
                    loaders: [{
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }]
                },
                plugins: [
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {warnings: false}
                    })
                ],
                resolve: {
                    extensions: ['.ts', '.js']
                }
            }
        },

        ts: {
            complie_server: {
                files: [{
                    files: [{
                        src: ["server/**/*.ts", "!server/.baseDir.ts"],
                        dest: "./dist"
                    }],
                    options: {
                        module: "commonjs",
                        target: "es6",
                        sourceMap: false,
                        options: {
                            callback: function (ts) {

                            }
                        }
                    }
                }]
            }
        },

        copy: {
            client_static: {
                files: [{
                    expand: true,
                    cwd: './client',
                    src: ["**", "!**/js/**"],
                    dest: "./dist/client"
                }]
            },
            server_template: {
                files: [{
                    expand: true,
                    cwd: "./server/views",
                    src: ["**"],
                    dest: "./dist/server/views"
                }]
            }
        },

        concurrent: {
            dev: {
                task: ['nodemon', 'watch', "browserSync"],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--inspect'],
                    env: {PORT: 8080},
                    delay: 1000,
                    ignore: ['node_modules/**'],
                    ext: 'js, ejs',
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log('nodemon log : ' + event.colour);
                        });

                        nodemon.on('config:update', function(event) {
                            require('open')('http://localhost:8080');
                        });

                        nodemon.on('restart', function () {
                            console.log("nodemon restart");
                            setTimeout(function() {
                              require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },

        watch: {
            client_webpack: {
                files: ['client/js/**/*.ts'],
                tasks: ['webpack']
            },
            client_static: {
                files: ["client/**", "!client/js/**"],
                tasks: ["copy:client_static"]
            },
            server_ts: {
                files: ["server/**/*.ts", "common/**/*.ts", "!client/js/**/*.ts"],
                tasks: ["ts"]
            },
            server_template: {
                files: ["**/*.ejs", "!dist/**/*.ejs"],
                tasks: ["copy:server_template"]
            }
        },
        browserSync: {
            files: [".rebooted"]
        }    
    });

    // 2. 사용한 플러그인 로딩(먼저 npm으로 설치를 해야 함)
    grunt.loadNpmTask('grunt-webpack');
    grunt.loadNpmTask('grunt-ts');
    grunt.loadNpmTask('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-browser-sync');

    // 3. 실행 명령어 (명령창에서 grunt 명령으로 실행됨)
    // default -> grunt
    // build -> grunt build
    grunt.registerTask("default", [
        "webpack",
        "ts",
        "copy",
        "concurrent"
    ]);
}