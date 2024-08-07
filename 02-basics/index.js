const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  const log = `New req received  ${Date.now()}, FROM:- ${req.url} \n`;

  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("HOMEPAGE");
        break;
      case "/about":
        const name = myUrl.query.name;
        res.end(`Hello ${name}`);
        break;
      case "/search":
        const s = myUrl.query.search_query;
        res.end(`Here are your results for ${s}`);
        break;

      default:
        res.end("404 NOT FOUND");
        break;
    }
  });
});

myServer.listen(8080, () => console.log(" server started"));
