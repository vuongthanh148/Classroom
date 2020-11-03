const startUtil = require("BmApp\\startUtil.js");
const express = require("express");
var cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors());

var data = [
  {
    name: "Vương Tiến Thành",
    birthday: "14/08/2000",
    sex: "Nam",
  },
  {
    name: "Cao Duy Mạnh",
    birthday: "19/12/2000",
    sex: "Nam",
  },
  {
    name: "Lê Quang Duy",
    birthday: "31/12/2000",
    sex: "Nam",
  },
  {
    name: "Lê Thị Hạnh",
    birthday: "19/04/2000",
    sex: "Nữ",
  },
  {
    name: "Nguyễn Văn Mạnh",
    birthday: "19/04/2000",
    sex: "Nữ",
  },
];

startUtil.startApp(function (err) {
  console.log(err);
  const ClassUser = require("./model/user");
  const user = new ClassUser();
  // data.forEach((d) => {
  //   user.new(d);
  // });
  var newData;
  app.use(express.static(__dirname + '/views'));
  console.log(__dirname + '/views');

  // app.get("/", (req, res) => {
  //   res.render('views\\index');
  // });

  app.get("/get", (req, res) => {
    user.getAll().then((data) => {
      newData = data;
      res.send(newData);
      console.log('data ',JSON.stringify(newData));
    });
  });

  app.post("/delete", (req, res) => {
    res.statusCode = "200";
    data = req.body;
    data.forEach(d => {
      user.delete(d);
    })
  });

  app.post("/add", async (req, res) => {
    data = req.body;
    var result = await user.new(data);

    res.send(result);
  });

  app.post("/edit", (req, res) => {
    res.statusCode = "200";
    data = req.body;
    user.edit(data.i, data.newObj).then(() => {
      console.log('done')
    }) ;
  });

  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});
