const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const prod = process.env.NODE_ENV === "production";

module.exports = {
  mode: prod ? "production" : "development", //개방 모드와 생산 모드를 구분하는 것
  devtool: prod ? "hidden-source-map" : "eval",
  entry: "./src/index.tsx", //시작파일
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], //사용할 확장자
  },
  module: {
    rules: [
      //함께 사용할 모듈과
      {
        test: /\.tsx?$/, //어떤 형태의 확장자를 loader를 이용하여 변환할지를 정규표현식을 이용하여 나타낸다
        use: ["babel-loader", "ts-loader"], // 변환할때 어떤 loader를 사용할지에 대해 작성
      },
    ],
  },
  output: {
    // 웹팩을 하고 출력할 결과물을 어떤 폴더의 이름으로 폴더를 만들지 , 어떤 이름으로 결과물의 이름을 만들지 결정
    // 현제 = dist라는 폴더를 생성하고 거기에 build된 결과물을 넣음
    path: path.join(__dirname, " /dist"),
    filename: "bundle.js",
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    //웹팩에서 함께 사용할 플러그인들은 new 생성자를 이용하여 적용시키는 곳이다
    //자주 사용되는 모듈을 미리 등록하여 매번 작성하지 않도록 해주는 플러그인이다
    new webpack.ProvidePlugin({
      React: "react",
    }),
    //빌드된 폴더에 js파일을 연결한 html파일을 자동으로 생성해주는 플러그인 html-webpack-plugin
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    //웹팩 dev-sever하는 플러그인으로 개발을할시 다시 빌드하고 새로고침을 하지 않아도
    //바로바로 결과를 보여 줄 수 있게 하는 플러그인
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
};
