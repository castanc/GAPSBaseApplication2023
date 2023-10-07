let dataVisible = false;
let docs = [];
let doc = {};
let page = 0;

function toggleEdit() {
    dataVisible = !dataVisible;
    if (dataVisible)
        showControl(DIV_EDIT_DATA);
    else
        hideControl(DIV_EDIT_DATA);
}


function editStage() {
    if (!mobile)
        showCards(stage);
    else {
        dataVisible = true;
        editDocument(ixDoc);
    }

}


function prevField() {
    hideControl(`p${page}`);
    page--;
    if (page < 0) page = 7;
    showControl(`p${page}`);

}

function nextField() {
    hideControl(`p${page}`);
    page++;
    if (page > 7) page = 0;
    showControl(`p${page}`);

}


function viewNext() {

    if (ixDoc < stage.length)
        ixDoc++;
    else ixDoc = 1;
    setValue(FLD_SELECTOR, ixDoc.toString());
    editDocument(ixDoc);
}



function viewPrev() {
    if (ixDoc > 1)
        ixDoc--;
    else ixDoc = stage.length - 1;
    setValue(FLD_SELECTOR, ixDoc.toString());
    editDocument(ixDoc);
}


function getDoc(p) {
    let docArr = docs.filter(x => x.Order == p.Oder);
    if (docArr.length == 0) {
        doc = {};
        doc.FileName = p.FileName;
        doc.Ext = p.Ext;
        doc.Size = p.Size;
        doc.DateCreated = p.DateCreated;
        doc.DateLastAccess = p.DateLastAccess;
        doc.Id = p.Id;
        doc.Order = p.Order;

        fields = "Reference,Details,KeyValuePairData,RawOcrData,DocType,Source,Target,Money,Profile".split(',');
        for (let i = 0; i < fields.length; i++) {
            doc[fields[i]] = "";
        }
        doc.value = 0;
        docs.push(doc);
        return doc;
    }
    return docArr[0];
}

function deleteDoc(val) {
    let docArr = docs.filter(x => x.Order == ixDoc);
    if (docArr.length > 0) {
        doc = docArr[0];
        doc.Delete = val;
        if (doc.Delete) {
            showControl("iconDeleted");
            hideControl("iconDelete");
        }
        else {
            showControl("iconDelete");
            hideControl("iconDeleted");

        }
    }
}

function showAllFields() {
    dataVisible = !dataVisible;
    if (dataVisible) {
        for (let i = 0; i < 8; i++) {
            let ctlName = `p${i}`;
            showControl(ctlName);
        }
    }
    else {
        for (let i = 0; i < 8; i++) {
            let ctlName = `p${i}`;
            hideControl(ctlName);
        }
        showControl("p0");
    }
}


function setData(d) {
    setDateValue("DateLastAccess", doc.DateLastAccess);
    setDateValue("Time", doc.DateLastAccess);
    setValue("Reference", doc.Reference);
    setValue("FileName", doc.FileName);
    setValue("Value", doc.Value);
    setValue("Details", doc.Details);
    setValue("KeyValuePairData", doc.KeyValuePairData);
    setValue("RawOcrData", doc.RawOcrData);
}


function buildSelector() {
    let html = "";
    let options = "";
    for (let i = 0; i < stage.length; i++) {
        options = `${options}<option value=${stage[i].Order}>${stage[i].Order}</option>`;
    }
    html = `<select id="fldSelector" onchange="selectCurrentDocument()">${options}</select>/${stage.length}`;
    writeInnerHTML("selector", html);
}


function selectCurrentDocument() {
    let ctl = document.getElementById(FLD_SELECTOR);
    ixDoc = Number(ctl.value);
    editDocument(ixDoc);
}
function editDocument(order) {
    showControl(DIV_EDIT_DATA);
    logDebug(editDocument.name, order);
    let p = stage.filter(x => x.Order == order);
    console.log(p);
    if (p.length > 0) {
        doc = getDoc(p[0]);
        setData(doc);
        hideControl(DIV_OPTIONS);
        hideControl(DIV_MAIN_MENU);
        hideControl(DIV_CARDS);
        showControl(DIV_EDIT_DOCUMENT);
        //let imgHtml = `<img src="${baseUrl1}${p[0].Id}" width="540px">`;
        let imgHtml = `<img src="${baseUrl1}${p[0].Id}" onclick="viewNext()" ondoubhleclick="viewPrev()">`;
        logDebug(editDocument.name, imgHtml);
        writeInnerHTML(DIV_IMAGE_EDIT, imgHtml);
        if (doc.Delete) {
            showControl("iconDeleted");
            hideControl("iconDelete");
        }
        else {
            showControl("iconDelete");
            hideControl("iconDeleted");

        }

    }
    else dangerMessage(`Image ${order} not found`);
}

function closeEdit() {
    showControl(DIV_OPTIONS);
    showControl(DIV_CARDS);
    showControl(DIV_MAIN_MENU);
    hideControl(DIV_EDIT_DOCUMENT);

}

function closeDocData() {
    dataVisible = false;
    hideControl(DIV_EDIT_DATA);

}

