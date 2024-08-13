const express = require("express");
const status = require("express-status-monitor");
const fs = require("fs");
const zlib = require("zlib");

const app = express();

app.use(status());

// USED TO ZIP THE FILE,
fs.createReadStream("./sample.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))
);

app.get("/", (req, res) => {
  /* fs.readFile("./sample.txt", (err, data) => {
        res.end(data);
     });

     THE SYSTEM WILL TAKE ALL TEXT/DATA FROM THE FILE AND STORE IT IN A LOCAL VARIABLE(DATA)
     AND THEN RENDER IT ON THE SCREEN... BUT THE PROBLEM IS IF WE HAVE VERY LARGE DATA AND MANY USERS 
     MEMORY CONSUMPTION WILL GO VERY HIGH AND SERVER MAY CRASH
  */

  /* WE DIVIDE THE WHOLE DATA IN CHUNKS AND LOAD THE CHUNK AND RENDER IT,
     THEN LOAD ANOTHER CHUNK AND RENDER IT, A LOT OF MEMORY IS SAVED */
  const stream = fs.createReadStream("./sample.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});

app.listen(8080);
