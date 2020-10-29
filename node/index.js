const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const endpoint = req.url;
  if (endpoint === "/start") {
    fs.readFile("./index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
  if (endpoint === "/api") {
    // クライアントからデータを受け取ると発生するイベント。
    req.on("data", function (temp) {
      let data = JSON.parse(temp);
      const len = data.obj.length;

      data2 = data.obj.slice();
      data.obj = data2.map((val, key) => {
        for (let i = 0; i < len; i++) {
          if (key !== i && val.num % data2[i].num === 0) {
            return { num: val.num, text: val.text + data2[i].text };
          }
        }
        return { num: val.num, text: val.text };
      });

      let answer = { data: [] };
      for (let i = 0; i < 30; i++) {
        let isFizzBuzzLike = true;
        for (let j = 0; j < len; j++) {
          if ((i + 1) % data.obj[j].num === 0) {
            isFizzBuzzLike = false;
            answer.data[i] = data.obj[j].text;
          }
        }
        if (isFizzBuzzLike) {
          answer.data[i] = i + 1;
        }
      }
      // データの受け取りが完了すると発生するイベント,引数なし
      req.on("end", () => {
        res.end(JSON.stringify(answer));
      });
    });
  }
});
server.listen(8080);
