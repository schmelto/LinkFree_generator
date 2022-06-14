// {
//     "name": "YOUR NAME",
//     "type": "personal",
//     "bio": "Open Source Enthusiast!",
//     "avatar": "https://github.com/YOUR_GITHUB_USERNAME.png",
//     "links": [
//       {
//         "name": "Follow me on GitHub",
//         "url": "https://github.com/YOUR_GITHUB_USERNAME",
//         "icon": "github"
//       },
//       {
//         "name": "Follow me on Twitter",
//         "url": "https://twitter.com/YOUR_TWITTER_USERNAME",
//         "icon": "twitter"
//       }
//     ],
//     "milestones": [
//       {
//         "title": "Started Freelancing",
//         "date": "December 2021",
//         "icon": "dollar",
//         "color": "grey",
//         "description": "Started freelancing",
//         "url": "https://www.eddiejaoude.io/"
//       }
//     ]
//   }


let links = [];
let milestones = [];


function generateJson() {
    links = [];
    milestones = [];
    getLinks();
    getMilestones();
    var username = document.getElementById("username").value;
    let name = document.getElementById("firstname").value + ` ` + document.getElementById("lastname").value;
    let type = document.getElementById("type").value;
    let bio = document.getElementById("bio").value;
    let avatar = `https://github.com/${username}.png`;
    var json = {
        "name": name,
        "type": type,
        "bio": bio,
        "avatar": avatar,

    }

    if (links.length > 0) {
        // append links : links to the json object
        json["links"] = links;
    }

    if (milestones.length > 0) {
        // append milestones : milestones to the json object
        json["milestones"] = milestones;
    }

    document.getElementById("json-container").classList.remove('d-none');
    document.getElementById("json-output").innerHTML = syntaxHighlight(JSON.stringify(json, undefined, 4));
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
            "name": name,
            "url": url,
            "icon": icon
        }

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


        // "title": "Started Freelancing",
        //         "date": "December 2021",
        //         "icon": "dollar",
        //         "color": "grey",
        //         "description": "Started freelancing",
        //         "url": "https://www.eddiejaoude.io/"
        // get the values in the input fields
        var title = tbody.rows[i].cells[0].getElementsByTagName("input")[0].value;
        var date = tbody.rows[i].cells[1].getElementsByTagName("input")[0].value;
        var icon = tbody.rows[i].cells[2].getElementsByTagName("select")[0].value;
        var color = tbody.rows[i].cells[3].getElementsByTagName("input")[0].value;
        var description = tbody.rows[i].cells[4].getElementsByTagName("input")[0].value;
        var url = tbody.rows[i].cells[5].getElementsByTagName("input")[0].value;

        // create a milestone object
        var milestone = {
            "title": title,
            "date": date,
            "icon": icon,
            "color": color,
            "description": description,
            "url": url
        }

        // push the milestone object into the milestones array
        milestones.push(milestone);
    }

}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function CopyToClipboard(containerid) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        document.getElementById('text-helper-clipboard').innerHTML = 'JSON has been copied!';
    }
}


async function appVersion() {
    const response = await fetch('https://api.github.com/repos/schmelto/LinkFree_generator/releases/latest', {
        method: 'GET',
        mode: 'cors'
    })
    const data = await response.json()
    document.getElementById('app-version').innerHTML = data.name
}

appVersion()