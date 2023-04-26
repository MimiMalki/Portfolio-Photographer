import prodb, {
  bulkcreate,
  createEle,
  getData,
  SortObj
} from "./module.js";


let db = prodb("Tarifdb", {
  tarifs: `++id, title, description, price`
});

// input tags
const tarifid = document.getElementById("tarifid");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");

// create button
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// event listerner for create button
btncreate.onclick = event => {
  // insert values
  let flag = bulkcreate(db.tarifs, {
    title: title.value,
    description: description.value,
    price: price.value
  });
  // reset textbox values
  //title.value = "";
  //description.value = "";
  // price.value = "";
  title.value = description.value = price.value = "";

  // set id textbox value
  getData(db.tarifs, data => {
    tarifid.value = data.id + 1 || 1;
  });
  table();

  let insertmsg = document.querySelector(".insertmsg");
  getMsg(flag, insertmsg);
};

// event listerner for create button
btnread.onclick = table;

// button update
btnupdate.onclick = () => {
  const id = parseInt(tarifid.value || 0);
  if (id) {
    // call dexie update method
    db.tarifs.update(id, {
      title: title.value,
      description: description.value,
      price: price.value
    }).then((updated) => {
      // let get = updated ? `data updated` : `couldn't update data`;
      let get = updated ? true : false;

      // display message
      let updatemsg = document.querySelector(".updatemsg");
      getMsg(get, updatemsg);

      title.value = description.value = price.value = "";
      //console.log(get);
    })
  } else {
    console.log(`Please Select id: ${id}`);
  }
}

// delete button
btndelete.onclick = () => {
  db.delete();
  db = prodb("Tarifdb", {
    tarifs: `++id, title, description, price`
  });
  db.open();
  table();
  textID(tarifid);
  // display message
  let deletemsg = document.querySelector(".deletemsg");
  getMsg(true, deletemsg);
}

window.onload = event => {
  // set id textbox value
  textID(tarifid);
};

// create dynamic table
function table() {
  const tbody = document.getElementById("tbody");
  const notfound = document.getElementById("notfound");
  notfound.textContent = "";
  // remove all childs from the dom first
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  getData(db.tarifs, (data, index) => {
    if (data) {
      createEle("tr", tbody, tr => {
        for (const value in data) {
          createEle("td", tr, td => {
            td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value];
          });
        }
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fa-solid fa-pen-to-square btnedit";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = editbtn;
          });
        })
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fa-sharp fa-solid fa-trash btndelete";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = deletebtn;
          });
        })
      });
    } else {
      notfound.textContent = "No record found in the database...!";
    }

  });
}

const editbtn = (event) => {
  let id = parseInt(event.target.dataset.id);
  db.tarifs.get(id, function (data) {
    let newdata = SortObj(data);
    tarifid.value = newdata.id || 0;
    title.value = newdata.title || "";
    description.value = newdata.description || "";
    price.value = newdata.price || "";
  });
}

// delete icon remove element 
const deletebtn = event => {
  let id = parseInt(event.target.dataset.id);
  db.tarifs.delete(id);
  table();
}

// textbox id
function textID(textboxid) {
  getData(db.tarifs, data => {
    textboxid.value = data.id + 1 || 1;
  });
}

// function msg
function getMsg(flag, element) {
  if (flag) {
    // call msg 
    element.classTarif += " movedown";

    setTimeout(() => {
      element.classList.forEach(classTarif => {
        classTarif == "movedown" ? undefined : element.classList.remove('movedown');
      })
    }, 4000);
  }
}
