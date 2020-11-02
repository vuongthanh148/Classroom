var createData = [];
var arrCheckbox = [];
var selectDeleteItemId = [];
var show = false;
var chosen;
var listEdit = [];

var addItem = (d) => {
  var markup = `<tr id = ${d._id}>
    <td><input type="checkbox" /></td>
    <td>${d.name}</td>
    <td>${d.birthday}</td>
    <td>${d.sex}</td>
    <td><button id= ${d._id} class = "edit">Sửa</button></td>
    </tr>`;

  document.querySelector("tbody").insertAdjacentHTML("beforeend", markup);
};

var setBaseColor = () => {
  var countcheck = 0;
  arrCheckbox = document.querySelectorAll('input[type="checkbox"]');

  arrCheckbox.forEach((e, i) => {
    if (i > 0) {
      var cl = "";
      i % 2 === 0 ? (cl = "lightgrey") : (cl = "white");
      if (e.checked != true)
        e.parentElement.parentElement.style.backgroundColor = cl;
      e.parentElement.parentElement.addEventListener("mouseover", () => {
        if (e.checked != true) {
          e.parentElement.parentElement.style.backgroundColor = "limegreen";
        }
      });
      e.parentElement.parentElement.addEventListener("mouseout", () => {
        if (e.checked != true)
          e.parentElement.parentElement.style.backgroundColor = cl;
      });
    }

    var curState = e.checked;
    e.parentElement.parentElement.addEventListener("click", (event) => {
      if (i != 0 && event.target.tagName !=  "BUTTON") {
        //Not header
        e.checked == true ? (e.checked = false) : (e.checked = true);
        if (e.checked === curState) e.checked = !e.checked;
      }
      curState = e.checked;
      if (e == arrCheckbox[0]) {
        arrCheckbox.forEach((g, j) => {
          j % 2 === 0 ? (cl = "lightgrey") : (cl = "white");
          g.checked = e.checked;
          if (g.checked == true) {
            g.parentElement.parentElement.style.backgroundColor = "yellow";
          } else {
            if (j > 1) g.parentElement.parentElement.style.backgroundColor = cl;
          }
        });
      }
      countcheck = 0;
      if (e.checked == true) {
        e.parentElement.parentElement.style.backgroundColor = "yellow";
      }
      arrCheckbox.forEach((f) => {
        if (f.checked == true && f != arrCheckbox[0]) countcheck++;
        if (countcheck == arrCheckbox.length - 1) {
          arrCheckbox[0].checked = true;
        } else if (countcheck < arrCheckbox.length - 1)
          arrCheckbox[0].checked = false;
      });
    });
  });
};

var deleteItem =  () => {
  var arrCheckbox = document.querySelectorAll('input[type="checkbox"]');
  arrCheckbox.forEach((e) => {
    if (e.checked == true && e != arrCheckbox[0]) {
      selectDeleteItemId.push(e.parentElement.parentElement.id);
      e.parentElement.parentElement.parentElement.removeChild(
        e.parentElement.parentElement
      );
    }
    setBaseColor();
  });
};

var addingForm = () => {
  document.querySelector(".table_data").classList.add('classTableIn');
  document.querySelector(".form").classList.remove('classFormOut');
  document.querySelector(".table_data").classList.remove('classTableOut');
  document.querySelector(".form").classList.add('classFormIn');

  document.querySelector(".table_data").style.width = '75%';
  document.querySelector(".form").style.width = '23%';
  
  document.querySelector(".form").style.display = "flex";
  button.textContent = "Huỷ";
}

var removingForm = () => {
  document.querySelector(".form").classList.remove('classFormIn');
  document.querySelector(".table_data").classList.remove('classTableIn');
  document.querySelector(".form").classList.add('classFormOut');
  document.querySelector(".table_data").classList.add('classTableOut');

  document.querySelector(".table_data").style.width = '100%';
  document.querySelector(".form").style.display = "none";
  button.textContent = "Thêm";
}

var confirmButton = async (i) => {
  var name = document.querySelector(".input_name").value;
  var birthday = document
  .querySelector(".input_birth")
  .value.split("-")
  .reverse()
  .join("/");
  
  var sex = document.querySelector(".input_gender").value;

  var newObj = {
    name,
    birthday,
    sex,
  };

  if (name && birthday) {
    if (i == -1) {//add Item
      var newId = await addServerItem(newObj);
      newObj._id = newId;
      createData.push(newObj);
      addItem(newObj);//Add to client
      setBaseColor();
      setAction();
    } else {//Edit Item
      // createData[i] = newObj;
      var obj = document.getElementById(`${i}`)
      obj.children[1].textContent = newObj.name;
      obj.children[2].textContent = newObj.birthday;
      obj.children[3].textContent = newObj.sex;
      editServerItem({i, newObj});
    }
    document.querySelector(".input_name").value = "";
    document.querySelector(".input_birth").value = "";
    removingForm();
  }
};

var deleteServerItem = async (listId) => {
  await axios
    .post("/delete", listId, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      console.log("res: ", res);
    });
};

var addServerItem = async (obj) => {
  var newId;
  await axios
    .post("/add", obj, {
      headers: { "Content-Type": "application/json" },
    })
    .then((result) => {
      newId = result.data;
    });
  return newId;
};

var editServerItem = async (data) => {
  await axios
    .post("/edit", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      console.log(res.data);
    });
};

var setAction = () => {
  listEdit = document.querySelectorAll(".edit");
  listEdit.forEach(b => {
    
    b.addEventListener("click", () => {
      handleForm(b.id)
    });
  });
};

var handleForm = (i) => {
  chosen = i;
  if (i != -1) {
    var obj = document.getElementById(`${i}`)
    document.querySelector(".input_name").value = obj.children[1].textContent;
    document.querySelector(".input_birth").value = obj.children[2].textContent
      .split("/")
      .reverse()
      .join("-");
    document.querySelector(".input_gender").value = obj.children[3].textContent;
    show = true;
  } else show = !show;

  if (show) {
    addingForm();
  } else {
      removingForm();
    }
  document.querySelector('.input_name').focus();
};

axios.get("/get").then((response) => {
  createData = response.data;
  console.log(createData);
  createData.forEach((d) => {
    addItem(d);
  });

  setBaseColor();
  setAction();

  document.querySelector(".xoa").addEventListener("click", () => {
    deleteItem();
    deleteServerItem(selectDeleteItemId);
    setAction();
  });
});

var button = document.querySelector(".add");
button.addEventListener("click", () => {
  //show/hide the input form :)
  handleForm(-1);
});
document.querySelector(".confirm").addEventListener("click", () => {
  confirmButton(chosen);
});
