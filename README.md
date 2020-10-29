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
  // Do something with the retrieved data ( found in xmlhttp.response )
};
xhr.send(null);
```

[XMLHttpRequest.open()](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/open)

```txt
新しく作成されたリクエストを初期化したり、既存のリクエストを再初期化したりします。
XMLHttpRequest.open(method, url[, async[, user[, password]]])
```

## REFERENCE

- [XMLHttpRequestEventTarget.onprogress](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequestEventTarget/onprogress)
- [XMLHttpRequestEventTarget.onload](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequestEventTarget/onload)
- [XMLHttpRequest](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest)
