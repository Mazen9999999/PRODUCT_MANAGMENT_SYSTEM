let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mode = "create";
let tmp;

// Get Total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(177, 7, 7)";
  }
}

// Create Product

let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

let alert = document.querySelector(".alert")
let alertBtn = document.querySelector(".alert button")

  // Count
  if(title.value != '' && price.value != '' && category.value != ''&& newPro.count < 100){
  if (mode === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mode = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }
  clearData();
  } else{
alert.style = "top: 0"
alertBtn.onclick = function () {
   alert.style = "top: -200px"
}
  }







  // Save In The LocalStorage

  +localStorage.setItem("product", JSON.stringify(dataPro));

 
  showData();
};

// Clear Inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";

  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read
function showData() {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>/
      <td>${dataPro[i].category}</td>
      <td><button onclick=" update(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>`;
  }

  getTotal();

  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `
     
     <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
     `;
  } else {
    deleteAll.innerHTML = "";
  }
}

showData();

// Delete & Delete All
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// Update
function update(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mode = "update";
  tmp = i;
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMode = "title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }

  search.placeholder = "Search By " + searchMode;

  search.focus();

  search.value = "";
  showData();
}

function searchProducts(value) {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    if (searchMode === "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>/
      <td>${dataPro[i].category}</td>
      <td><button onclick=" update(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>/
      <td>${dataPro[i].category}</td>
      <td><button onclick=" update(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

// Clean Data
