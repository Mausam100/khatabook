const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files });
  });
});
// create files
app.get("/create", (req, res) => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const fn = `${day}-${month}-${year}.txt`;

  fs.writeFile(`./files/${fn}`, "", function (err) {
    if (err) return res.send("kuch gad vaad hai");
    res.render("create", { file: fn });
  });
});
// edit page for all file
app.get("/edit", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    if (err) return res.send("kuch gad vaad hai");
    res.render("editpage", { files });
  });
});


// edit files
app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, data) {
    if (err) return res.send("kuch gad vaad hai");
    res.render("edit", { data, filename: req.params.filename });
  });
});
// update file

app.post("/update/:filename", (req, res) => {
  fs.writeFile(
    `./files/${req.params.filename}`,
    req.body.filedata,
    function (err) {
      if (err) return res.send("kuch gad vaad hai");
      res.redirect("/");
    }
  );
});

// delete file
app.get("/delete/:filename", (req, res) => {
    fs.unlink(`./files/${req.params.filename}`, function (err) {
      if (err) return res.send("kuch gad vaad hai");
      res.redirect("/");
    });
  });


  app.get("/test-create", (req, res) => {
    res.render("create", { file: fn });
  });
  

app.listen(3000);
