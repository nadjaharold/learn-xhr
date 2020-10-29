# Learn XMLHttpRequest

## MEMO

[XMLHttpRequest.readyState](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/readyState)

```txt
値 状態 説明

- 0 UNSENT クライアントは作成済み。open() はまだ呼ばれていない。
- 1 OPENED open() が呼び出し済み。この状態の間は、リクエストヘッダーをsetRequestHeader() メソッドを使ってセットできて、send() メソッドを呼び出して取得を開始できる。
- 2 HEADERS_RECEIVED send() が呼び出し済みで、ヘッダーとステータスが利用可能。レスポンスヘッダーを受け取り済み。
- 3 LOADING ダウンロード中。responseText には部分データが入っている。ResponseType が "text" か空文字の場合、responseText はロードするごとに部分テキストを持つ。
- 4 DONE 操作が完了した。データ転送が完全に成功したか失敗したかどちらでもありうる。
```

```typescript
const xhr = new XMLHttpRequest();
console.log("UNSENT", xhr.readyState); // readyState will be 0
xhr.open("GET", "/api", true);
console.log("OPENED", xhr.readyState); // readyState will be 1
xhr.onprogress = function () {
  console.log("LOADING", xhr.readyState); // readyState will be 3
};
xhr.onload = function () {
  console.log("DONE", xhr.readyState); // readyState will be 4
  // Do something with the retrieved data ( found in xhr.response )
  const data = xhr.response;
};
xhr.send(null);
```

```typescript
// open()は非同期処理なのでこういう記法もあり。
const url = "somePage.html"; // A local page
function load(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.response);
    }
  };
  xhr.open("GET", url, true);
  xhr.send("");
}
```

[XMLHttpRequest.open()](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/open)

```txt
新しく作成されたリクエストを初期化したり、既存のリクエストを再初期化したりします。
XMLHttpRequest.open(method, url[, async[, user[, password]]])
```

[Node.js / HTTP](https://nodejs.org/api/http.html)

- [http.createServer([options][, requestListener]](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener)

```typescript
const http = require("http");
const fs = require("fs");

// createServer(requestListener), 返り値はhttp.Server ≒ net.Server.
// This class is used to create a TCP or IPC server.
// The requestListener is a function which is automatically added to the 'request' event.
const server = http.createServer((req, res) => {
  const endpoint = req.url; // リクエストURLはreq.urlに入っている。
  if (endpoint === "/start") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("page not found");
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data); // HTML 文書の解析, DOMの描画
      res.end();
    });
  }
  if (endpoint === "/api") {
    // req: Emitted each time there is a request. There may be multiple requests per connection (in the case of HTTP Keep-Alive connections).
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

      req.on("end", () => {
        res.end(JSON.stringify(answer));
      });
      // 非同期リクエストを処理している間、 responseText の値は、
      // データが完全に受信できておらず不完全であっても、常にサーバーから受信した現在のコンテンツを持ちます。
      // html側のonreadystatechange()で変更を検知し、readyState の値が XMLHttpRequest.DONE (4) になり、
      // status の値が 200 ("OK") になった場合、コンテンツ全体が受信されたことが分かる。
    });
  }
});
// Create a server that listens on port 8080 of your computer.
server.listen(8080);
```

## REFERENCE

- [XMLHttpRequestEventTarget.onprogress](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequestEventTarget/onprogress)
- [XMLHttpRequestEventTarget.onload](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequestEventTarget/onload)
- [XMLHttpRequest](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest)
- [XMLHttpRequest の使用](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
