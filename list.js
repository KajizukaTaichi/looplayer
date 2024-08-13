function createList() {
  var list = document.createElement("ul");
  list.className = "list-group";

  for (var i = 0; i < localStorage.length; i++) {
    (function (i) {
      var item = document.createElement("li");
      item.textContent = `${Object.keys(localStorage)[i]}`;
      item.className = "list-group-item";

      item.addEventListener("click", function () {
        var value = localStorage
          .getItem(Object.keys(localStorage)[i])
          .split(",");
        document.getElementById("videoId").value = value[0];
        document.getElementById("startTime").value = value[1];
        document.getElementById("endTime").value = value[2];
      });
      list.appendChild(item);
    })(i);
  }

  return list;
}

function showList() {
  document.getElementById("list").innerHTML = "";
  document.getElementById("list").appendChild(createList());
}

function addList() {
  const key = document.getElementById("key").value;
  const value = document.getElementById("videoId").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;
  localStorage.setItem(key, [value, start, end]);

  showList();
}

document.addEventListener("DOMContentLoaded", showList);
