var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map', // bundling 할 때, 에러를 원래파일로 트래킹하기 위한 옵션
    entry: ['./asset/js'], // building 시작지점
    output: { // bundle 생성 위치
        path: path.resolve(__dirname, 'dist/asset/js'),
        filename: 'app.js'
    },
    module: {
        loaders: [{ // 다른 type의 파일을 이해하고 처리 가능한 모듈로 변환
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true // typescript의 type check를 하지않고 transpile 작업만 진행
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ // 난독화
            compress: {warnings: false} // 특정 브라우저(ie8)에서 문법오류로 인해 최소화로 진행
        })
    ],
    resolve: {
        extensions: [".ts", ".js"] // require('filename') 할 때 확장자 없이 filename만 입력하려고 확장자 지정
    }
};
