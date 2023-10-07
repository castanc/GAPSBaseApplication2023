let dataVisible = false;
let docs = [];
let doc = {};
let page = 0;


function loadLocalFile(fi) {
    let o = {};
    o.Order = stage.length + 1;
    o.FileName = fi.Name;
    o.Ext = "";
    let ix = o.FileName.lastIndexOf(".");
    if (ix > 0) {
        o.FileName = o.FileName.substring(0, ix);
        o.Ext = o.FileName.substring(ix + 1);
    }
    o.DateLastAccess = fi.LastModified;
    o.DateCreated = fi.LastModified;
    o.Size = fi.Size;
    o.Status = "";
    o.Delete = false;
    o.Type = fi.Type;
    o.IsImage = fi.IsImage;
    o.IsPDF = fi.IsPDF;
    o.IsText = fi.IsText;
    o.Delete = false;
    o.Base64Data = fi.Base64Data;
    o.Source = "L";
    stage.push(o);

    if (stage.length >= filesLoaded) {
        hideControl(DIV_WELCOME);
        ixDoc = 1;
        buildSelector();
        editStage();
    }



}
function loadData(result) {
    saveData(K_LOCAL_DOWNLOADDATA, result);
    let ro = JSON.parse(result);
    if (ro.Code == 0) {
        logDebug(loadData.name, "sucess downloadData")
        stage = [];
        for (let i = 1; i < ro.Content.length; i++) {
            let o = {};
            for (let j = 0; j < ro.Content[0].length; j++) {
                o[ro.Content[0][j]] = ro.Content[i][j];
            }
            o.DateLastAccess = new Date(o.DateLastAccess);
            o.DateCreated = new Date(o.DateCreated);
            o.Status = "";
            o.Order = i;
            o.IsImage = getFileType(o.Ext) == "IMAGE";
            o.IsPDF = getFileType(o.Ext) == "PDF";
            o.IsText = getFileType(o.Ext) == "TEXT";
            o.Delete = false;
            o.Base64Data = "";
            o.Source = "GD";
            logFuncDebug(loadData.name, o);
            stage.push(o);
        }
    }
    else {
        logDebug(loadData.name, "SERVER EXCEPTION");
        logDebug(ro);
    }
    saveData("stage-objects", JSON.stringify(stage));
    hideControl(DIV_WELCOME);
    ixDoc = 1;
    buildSelector();
    editStage();
}


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
        doc.Id = p.Id;
        doc.Base64Data = p.Base64Data;
        doc.Order = p.Order;
        doc.Reference = "";
        doc.Details = "";
        doc.KeyValuePairData = "";
        doc.RawOcrData = "";
        doc.DocType = "";
        doc.Origin = "";
        doc.Target = "";
        doc.Money = "";
        doc.Profile = "";
        doc.value = 0;
        doc.FileName = p.FileName;
        doc.Ext = p.Ext;
        doc.Size = p.Size;
        doc.Source = p.Source;
        doc.IsImage = p.IsImage;
        doc.IsPDF = p.isPDF;
        doc.IsText = p.IsText;
        if (doc.Source == SOURCE_GDRIVE) {
            doc.DateCreated = p.DateCreated;
            doc.DateLastAccess = p.DateLastAccess;
        }
        else {
            doc.DateCreated = new Date(p.DateCreated);
            doc.DateLastAccess = new Date(p.DateLastAccess);

        }
        docs.push(doc);
        console.log("getDoc()",p);
        console.log(doc);
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
        console.log("doc",doc);
        setData(doc);
        hideControl(DIV_OPTIONS);
        hideControl(DIV_MAIN_MENU);
        hideControl(DIV_CARDS);
        showControl(DIV_EDIT_DOCUMENT);
        //let imgHtml = `<img src="${baseUrl1}${p[0].Id}" width="540px">`;
        let htmlFile = "";
        if (doc.IsImage && doc.Source == SOURCE_GDRIVE) {
            htmlFile = `<img src="${baseUrl1}${doc.Id}" onclick="viewNext()" ondoubhleclick="viewPrev()">`;
        }
        else if (doc.IsImage && doc.Source == SOURCE_LOCAL) {
            htmlFile = `<img src="${doc.Base64Data}" onclick="viewNext()" ondoubhleclick="viewPrev()">`;
        }
        else htmlFile = `<p>${doc.FileName}</p>`;
        writeInnerHTML(DIV_IMAGE_EDIT, htmlFile);
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
