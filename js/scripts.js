let links = [];
let milestones = [];

function generateJson() {
  links = [];
  milestones = [];
  getLinks();
  getMilestones();
  var username = document.getElementById("username").value;
  let name =
    document.getElementById("firstname").value +
    ` ` +
    document.getElementById("lastname").value;
  let type = document.getElementById("type").value;
  let bio = document.getElementById("bio").value;
  let avatar = `https://github.com/${username}.png`;
  var json = {
    name: name,
    type: type,
    bio: bio,
    avatar: avatar,
  };

  if (links.length > 0) {
    // append links : links to the json object
    json["links"] = links;
  }

  if (milestones.length > 0) {
    // append milestones : milestones to the json object
    json["milestones"] = milestones;
  }

  document.getElementById("json-container").classList.remove("d-none");
  document.getElementById("json-output").innerHTML = syntaxHighlight(
    JSON.stringify(json, undefined, 4)
  );
}

// get the vlaues from the input fields in the myTable into the links array
function getLinks() {
  var myTable = document.getElementById("myTable");

  // get only the rows tbody
  var tbody = myTable.getElementsByTagName("tbody")[0];

  // get the number of rows in the tbody
  var tbodyRowCount = tbody.rows.length;

  // loop through the rows
  for (var i = 0; i < tbodyRowCount; i++) {
    // get the values in the input fields
    var name = tbody.rows[i].cells[0].getElementsByTagName("input")[0].value;
    var url = tbody.rows[i].cells[1].getElementsByTagName("input")[0].value;
    var icon = tbody.rows[i].cells[2].getElementsByTagName("select")[0].value;

    // create a link object
    var link = {
      name: name,
      url: url,
      icon: icon,
    };

    // push the link object into the links array
    links.push(link);
  }
}

function getMilestones() {
  var myTable = document.getElementById("milestones");

  // get only the rows tbody
  var tbody = myTable.getElementsByTagName("tbody")[0];

  // get the number of rows in the tbody
  var tbodyRowCount = tbody.rows.length;

  // loop through the rows
  for (var i = 0; i < tbodyRowCount; i++) {
    var title = tbody.rows[i].cells[0].getElementsByTagName("input")[0].value;
    var date = tbody.rows[i].cells[1].getElementsByTagName("input")[0].value;
    var icon = tbody.rows[i].cells[2].getElementsByTagName("select")[0].value;
    var color = tbody.rows[i].cells[3].getElementsByTagName("input")[0].value;
    var description =
      tbody.rows[i].cells[4].getElementsByTagName("input")[0].value;
    var url = tbody.rows[i].cells[5].getElementsByTagName("input")[0].value;

    // create a milestone object
    var milestone = {
      title: title,
      date: date,
      icon: icon,
      color: color,
      description: description,
      url: url,
    };

    // push the milestone object into the milestones array
    milestones.push(milestone);
  }
}

function syntaxHighlight(json) {
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

function CopyToClipboard(id) {
  var r = document.createRange();
  r.selectNode(document.getElementById(id));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  document.getElementById("text-helper-clipboard").innerHTML =
    "JSON has been copied!";
}

async function appVersion() {
  const response = await fetch(
    "https://api.github.com/repos/schmelto/LinkFree_generator/releases/latest",
    {
      method: "GET",
      mode: "cors",
    }
  );
  const data = await response.json();
  document.getElementById("app-version").innerHTML = data.name;
}

appVersion();

let icons = [];

async function geticons() {
  const response = await fetch(
    "https://raw.githubusercontent.com/EddieHubCommunity/LinkFree/main/src/config/links.json",
    {
      method: "GET",
      mode: "cors",
    }
  );
  const data = await response.json();
  icons = Object.keys(data.validIcons);
}

geticons();

$(document).ready(function () {
  var counter = 0;

  $("#addrow").on("click", function () {
      var newRow = $("<tr>");
      var cols = `
          <td>
              <input type="text" class="form-control" placeholder="name" name="name${counter}" required/>
          </td>
          <td>
              <input type="text" class="form-control" placeholder="url" name="url${counter}" required/>
          </td>
          <td>
              <select class="form-select" name="icon${counter}" aria-label="Select Icon" required>
                  <option value="" selected>-- Select Icon --</option>
                  ${icons.map((icon) => `<option value="${icon}">${icon}</option>`)}
              </select>
          </td>
          <td><button class="btn btn-sm btn-danger ibtnDel">Delete</button></td>
          `;
      newRow.append(cols);
      $("table.order-list").append(newRow);
      counter++;
    });

  $("#addrowmilestone").on("click", function () {
    var newRow = $("<tr>");
    var cols = "";
    cols += `<td class="col">
                        <input type="text" name="title" class="form-control" placeholder="Title" required/>
                    </td>
                    <td class="col">
                        <input type="date" name="date" class="form-control" placeholder="" required/>
                    </td>
                    <td class="col">
                        <select class="form-select" name="icon" aria-label="Select Icon" required>
                            <option value="" selected>-- Select Icon --</option>
                            <! Loop through the icons array and create an option for each icon using getIcons() !>
                            
                        </select>
                    </td>
                    <td class="col">
                        <input type="text" name="color" class="form-control" placeholder="grey" required/>
                    </td>
                    <td class="col">
                        <input type="text" name="description" class="form-control" placeholder="description" required/>
                    </td>
                    <td class="col">
                        <input type="text" name="url" class="form-control" placeholder="https://www.github.com/username" required/>
                    </td>`;

    cols +=
      '<td><button class="btn btn-sm btn-danger ibtnDel">Delete</button></td>';
    newRow.append(cols);
    $("table.order-list2").append(newRow);
    counter++;
  });

  $("table.order-list").on("click", ".ibtnDel", function (event) {
    $(this).closest("tr").remove();
    counter -= 1;
  });

  $("table.order-list2").on("click", ".ibtnDel", function (event) {
    $(this).closest("tr").remove();
    counter -= 1;
  });

  $(document).on("submit", "#form-generator", function (e) {
    e.preventDefault();
    var form = $(this);
    if (!form[0].checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      generateJson();
    }
    form.addClass("was-validated");
    return false;
  });
});
