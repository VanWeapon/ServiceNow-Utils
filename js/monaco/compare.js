document.querySelectorAll("td.left[onclick]").forEach(td => {
    let field = td.id.replace('td-pulled-', '');
    let lnk = document.createElement('a');
    let linkText = document.createTextNode("[SN Utils Compare]");
    lnk.appendChild(linkText);
    lnk.href = "#";
    lnk.addEventListener('click', evt => {
        openMonaceDiff(field);

    });
    td.previousSibling.append(lnk);
});

document.querySelectorAll("td.left:not([onclick]):not(.spacer)").forEach(td => {
    let field = td.id.replace('td-pulled-', '');
    let fieldSplit = field.split('.');
    //TODO: There should be a check here weather ther elements with dummy. and comaprator exists before sending this to a comparator
    setupForNonEditableFields('dummy\.' + fieldSplit[1] + '\.' + fieldSplit[2], fieldSplit[1] + '\.' + fieldSplit[2], field, td);
});

function setupForNonEditableFields(leftBody, rightBody, field, td) {
    let lnk = document.createElement('a');
    let linkText = document.createTextNode("[SN Utils Compare]");
    lnk.appendChild(linkText);
    lnk.href = "#";
    lnk.addEventListener('click', evt => {
        openMonaceDiff(field, {
            leftBody: $(leftBody).value,
            rightBody: $(rightBody).value
        });
    });
    td.previousSibling.append(lnk);
}


function openMonaceDiff(field_name, context) {
    var event = new CustomEvent(
        "snutils-event", {
        detail: {
            event: "opencodediff"
        }
    }
    );
    window.top.document.dispatchEvent(event);

    setTimeout(function () {
        var rightBody = context ? context.rightBody : gel(field_name).value;
        var leftBody = context ? context.leftBody : _getElementByPrefix('pulled', field_name).value;

        var data = {
            rightBody: rightBody,
            leftBody: leftBody
        };
        var event = new CustomEvent(
            "snutils-event", {
            detail: {
                event: "fillcodediff",
                command: data
            }
        }
        );
        window.top.document.dispatchEvent(event);
    }, 400);


}