let dataVisible = false;
let additionalDataVisible = false;
let mailDataVisible = true;

let docData = [];
let doc = {};

const FLD_DATE = "fldDate";
const FLD_TIME = "fldTime";
const FLD_FILE_NAME = "fldFileName";
const FLD_REFERENCE = "fldReference";
const FLD_VALUE = "fldValue";
const FLD_DETAILS = "fldDetails";
const FLD_KEY_VALUE_PAIR_DATA = "fldKeyValuePairData";
const FLD_RAW_OCR_DATA = "fldRawOcrData";
const DIV_ADDITIONAL_DATA = "divAdditionalData";
const DIV_MAIN_DATA = "divMainData";
const FLD_SOURCE = "fldSource";
const FLD_TARGET = "fldTarget";
const ICON_DELETE = "icoNDelete";
const RED = "red";
const FLD_PROFILE = "fldProfile";




function toggleAdditionalData() {
    additionalDataVisible = !additionalDataVisible;
    if (additionalDataVisible) {
        showControl(DIV_ADDITIONAL_DATA);
        hideControl(DIV_MAIN_DATA);
    }
    else {
        hideControl(DIV_ADDITIONAL_DATA);
        showControl(DIV_MAIN_DATA);
    }
    scrollTo(DIV_EDIT_DOCUMENT);

}

function editNextStage() {
    if (ixDoc < stage.length)
        ixDoc++;
    else ixDoc = 0;
    reShowStage();
}

function editPrevStage() {
    if (ixDoc > 0) ixDoc--;
    else ixDoc = stage.length - 1;
    reShowStage();
}

function reShowStage() {
    dataVisible = false;
    additionalDataVisible = false;
    hideControl(DIV_EDIT_DATA);
    editDocument(ixDoc);
}




function setData() {
    setDateTimeValue(doc.DateLastAccess, FLD_DATE, FLD_TIME);
    setValue(FLD_FILE_NAME, doc.FileName);
    setValue(FLD_REFERENCE, doc.Reference);
    setValue(FLD_VALUE, doc.Value);
    setValue(FLD_DETAILS, doc.Details);
    setValue(FLD_KEY_VALUE_PAIR_DATA, doc.KeyValuePairData);
    setValue(FLD_RAW_OCR_DATA, doc.RawOCRData);
    setValue(FLD_SOURCE, doc.Source);
    setValue(FLD_TARGET, doc.Destinatary);
    setValue(FLD_MONEDAS, doc.Money);
    setValue(FLD_PROFILE, doc.Profile);


    if (doc.Delete) addClass(ICON_DELETE, RED);
    else removeClass(ICON_DELETE, RED);

}


function toggleEdit() {
    dataVisible = !dataVisible;
    if (dataVisible)
        showControl(DIV_EDIT_DATA);
    else
        hideControl(DIV_EDIT_DATA);
    scrollTo(DIV_EDIT_DOCUMENT);

}


function getDoc(p) {
    let docArray = docData.filter(x => x.Order == p.Order);
    if (docArray.length > 0)
        return docArray[0];
    else {
        let document = {};
        document.Order = p.Order;
        document.Id = p.Id;
        document.FileName = p.FileName;
        document.Ext = p.Ext;
        document.Size = p.Size;
        document.DateCreated = p.DateCreated;
        document.DateLastAccess = p.DateLastAccess;
        document.Status = p.Status;
        document.IsImage = p.IsImage;
        document.IsPDF = p.IsPDF;
        document.IsText = p.IsText;
        document.Delete = p.Delete;
        document.Details = "";
        document.KeyValuePairData = "";
        document.RawOCRData = "";
        document.Reference = "";
        document.Value = 0;
        document.Beneficiary = "";
        document.Source = "";
        document.Destinatary = "";
        document.Money = "";
        document.Profile = "";
        docData.push(document);
        return docData.filter(x => x.Order == p.Order)[0];
    }

}


function deleteDoc() {
    if (doc) {
        doc.Delete = !doc.deleteDoc;
        if (doc.Delete) addClass(ICON_DELETE, RED);
        else removeClass(ICON_DELETE, RED);

    }
}



function editDocument(order) {

    dataVisible = mobile;
    toggleEdit();

    logDebug(editDocument.name, order);
    logDebug("MOBILE", mobile);
    let p = stage.filter(x => x.Order == order);
    console.log(p);
    if (p.length > 0) {
        hideControl(DIV_OPTIONS);
        hideControl(DIV_MAIN_MENU);
        hideControl(DIV_CARDS);
        showControl(DIV_EDIT_DOCUMENT);
        doc = getDoc(p[0]);
        setData();

        let imgHtml = `<img src="${baseUrl1}${p[0].Id}" width="540px">`;
        let imgLink = `<a href="${baseUrl2}${p[0].Id}" target="blank">${imgHtml}</a>`;
        console.log(imgHtml);

        writeInnerHTML(DIV_IMAGE_EDIT, imgHtml);

        let ctl = document.getElementById("divData");
        if (ctl) {
            ctl.style.backgroundImage = `url(${imgHtml})|none|initial|inherit`;
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

