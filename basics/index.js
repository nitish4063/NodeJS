const http = require("http");
const fs = require("fs");

// fs.writeFile("newFile.txt", "hello sir", (err) => {
//   if (err) console.log(err);
//   console.log("created new file!");
// });

// fs.appendFile("newFile.txt", "\nHello content!", (err) => {
//   if (err) throw err;
//   console.log("Saved!");
// });

const myServer = http.createServer((req, res) => {
  const log = `New req received  ${Date.now()}, FROM:- ${req.url} \n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("HOMEPAGE");
        break;
      case "/about":
        res.end("Me NITU");
        break;
      default:
        res.end("404 NOT FOUND");
        break;
    }
  });
});

myServer.listen(8080, () => console.log(" server started"));
