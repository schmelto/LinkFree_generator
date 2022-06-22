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
                <option value="Android">Android</option>
                <option value="Apple">Apple</option>
                <option value="Book">Book</option>
                <option value="Codeforces">Codeforces</option>
                <option value="Codewars">Codewars</option>
                <option value="DEV.to">DEV.to</option>
                <option value="Discord">Discord</option>
                <option value="Dollar">Dollar</option>
                <option value="Envelope">Envelope</option>
                <option value="Facebook">Facebook</option>
                <option value="GitHub">GitHub</option>
                <option value="GitLab">GitLab</option>
                <option value="Globe">Globe</option>
                <option value="Graduation Hat">Graduation Hat</option>
                <option value="Hashnode">Hashnode</option>
                <option value="Instagram">Instagram</option>
                <option value="Laravel">Laravel</option>
                <option value="Left Arrow">Left Arrow</option>
                <option value="Link">Link</option>
                <option value="Linkedin">Linkedin</option>
                <option value="Medium">Medium</option>
                <option value="Microsoft">Microsoft</option>
                <option value="NodeJs">NodeJs</option>
                <option value="PayPal">PayPal</option>
                <option value="Polywork">Polywork</option>
                <option value="Search">Search</option>
                <option value="Send">Send</option>
                <option value="Slack">Slack</option>
                <option value="Snapchat">Snapchat</option>
                <option value="Telegram">Telegram</option>
                <option value="TikTok">TikTok</option>
                <option value="Twitch">Twitch</option>
                <option value="Twitter">Twitter</option>
                <option value="Vimeo">Vimeo</option>
                <option value="YouTube">YouTube</option>
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
                        <input type="text" name="title" class="form-control" placeholder="Title" />
                    </td>
                    <td class="col">
                        <input type="date" name="date" class="form-control" placeholder="" />
                    </td>
                    <td class="col">
                        <select class="form-select" name="icon" aria-label="Select Icon" required>
                            <option value="" selected>-- Select Icon --</option>
                            <option value="Android">Android</option>
                            <option value="Apple">Apple</option>
                            <option value="Book">Book</option>
                            <option value="Codeforces">Codeforces</option>
                            <option value="Codewars">Codewars</option>
                            <option value="DEV.to">DEV.to</option>
                            <option value="Discord">Discord</option>
                            <option value="Dollar">Dollar</option>
                            <option value="Envelope">Envelope</option>
                            <option value="Facebook">Facebook</option>
                            <option value="GitHub">GitHub</option>
                            <option value="GitLab">GitLab</option>
                            <option value="Globe">Globe</option>
                            <option value="Graduation Hat">Graduation Hat</option>
                            <option value="Hashnode">Hashnode</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Laravel">Laravel</option>
                            <option value="Left Arrow">Left Arrow</option>
                            <option value="Link">Link</option>
                            <option value="Linkedin">Linkedin</option>
                            <option value="Medium">Medium</option>
                            <option value="Microsoft">Microsoft</option>
                            <option value="NodeJs">NodeJs</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Polywork">Polywork</option>
                            <option value="Search">Search</option>
                            <option value="Send">Send</option>
                            <option value="Slack">Slack</option>
                            <option value="Snapchat">Snapchat</option>
                            <option value="Telegram">Telegram</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Twitch">Twitch</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Vimeo">Vimeo</option>
                            <option value="YouTube">YouTube</option>
                        </select>
                    </td>
                    <td class="col">
                        <input type="text" name="color" class="form-control" placeholder="grey" />
                    </td>
                    <td class="col">
                        <input type="text" name="description" class="form-control" placeholder="description" />
                    </td>
                    <td class="col">
                        <input type="text" name="url" class="form-control" placeholder="https://www.github.com/username" />
                    </td>`;

        cols += '<td><button class="btn btn-sm btn-danger ibtnDel">Delete</button></td>';
        newRow.append(cols);
        $("table.order-list2").append(newRow);
        counter++;
    });

    $("table.order-list").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();
        counter -= 1
    });

    $("table.order-list2").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();
        counter -= 1
    });

    $(document).on('submit', '#form-generator', function (e) {
        e.preventDefault();
        var form = $(this);
        if (!form[0].checkValidity()) {
            e.preventDefault();
            e.stopPropagation()
        } else {
            generateJson();
        }
        form.addClass('was-validated');
        return false;
    })
});