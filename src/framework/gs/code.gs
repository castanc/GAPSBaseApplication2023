var urlData = "https://docs.google.com/spreadsheets/d/1VeeARys1hM7BhrXUj-9vJY8mQTMGHXpwhJ4WnnBjK-A/edit#gid=0";
var url = "https://docs.google.com/spreadsheets/d/1g7Jke2Xz44Is-rb6i4UREjSNc35Y61iUqCKSQtjHZTU/edit#gid=0";
var urlData = "https://docs.google.com/spreadsheets/d/17QEUhq0QFySe1qD7WNIFbfCaKezmva8k3VXLYeWXuGI/edit#gid=0";
var stageFolder = "stage";
var result = {};

let u = {};
u.email = Session.getActiveUser().getEmail();
u.locale = Session.getActiveUserLocale();

function doGet(e) {
  Logger.log("doGet", JSON.stringify(e));
  //return HtmlService.createTemplateFromFile('index').evaluate().addMetaTag('viewport', 'width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0;');
  return HtmlService.createTemplateFromFile('index').evaluate().addMetaTag('viewport', 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0;');

}

function getLoggedUser() {
  Logger.log(getLoggedUser.name);
  u = {};
  u.email = Session.getActiveUser().getEmail();
  u.locale = Session.getActiveUserLocale();
  let json = JSON.stringify(u);
  return json
}


function downloadBaseData() {
  Logger.log(downloadData.name);
  let result = DownloadSheet(urlData);
  return JSON.stringify(result);

}

function downloadStageFiles(folderName = "") {
  Logger.log("downloadStage");
  let result = {}
  try {
    result.Message = "Success";
    result.Code = 0;
    result.Content = getFilesInfo(folderName);
  }
  catch (ex) {
    result.Message = `SERVER EXCEPTION: ${ex.message}`;
    result.Code = -1;
    result.ex = ex;
  }
  Logger.log("Result");
  Logger.log(JSON.stringify(result));
  return JSON.stringify(result);
}


function downloadFoldersInfo() {
  let result = {}
  try {
    result.Message = "Success";
    result.Code = 0;
    result.Content = getFoldersInfo();
  }
  catch (ex) {
    result.Message = `SERVER EXCEPTION: ${ex.message}`;
    result.Code = -1;
    result.ex = ex;
  }
  Logger.log("Result");
  Logger.log(JSON.stringify(result));
  return JSON.stringify(result);
}


function testBlob() {
  let result = getBlob("https://drive.google.com/file/d/1LIb_vA09Q8u-Bq0h1PQQttnF2-Tp047M/view");



}
function getBlob(url) {
  //var url = "https://www.googleapis.com/drive/v3/files/" + fileID + "?alt=media";
  var blob = UrlFetchApp.fetch(url, {
    method: "get",
    headers: { "Authorization": "Bearer " + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true
  }).getBlob();
  //return JSON.stringify(blob.getBytes());
  return Utilities.base64Encode(blob.getBytes());
}



function testInsertImage() {

  let ss = SpreadsheetApp.openByUrl(url);
  var sheet = ss.getSheets()[0];
  var folders = DriveApp.getFoldersByName(stageFolder);
  if (folders.hasNext()) {
    // Assume folder name is unique, so use first match
    var folder = folders.next();

    var files = folder.getFiles();
    let i = 1;
    ss.appendRow(["Order", "FileName", "Size", "DateCreated", "DateLastAccess", "Id"]);
    while (files.hasNext()) {
      i++;
      // For this test, use first found file
      var file = files.next();

      //var imageBytes = DriveApp.getFileById(file.getId()).getBlob().getBytes();
      //var encodedImageURL = "data:image/jpeg;base64," + Utilities.base64Encode(imageBytes);

      // You can store encodeImageURL and use it as a parameter to Image.setImageUrl(url).


      let row = [i, file.getName(), file.getSize(), file.getDateCreated(), file.getLastUpdated(), file.getId()]
      ss.appendRow(row);

      var img = Drive.Files.get(file.getId()).webContentLink;
      //sheet.insertImage(img, 2, row);  // In Class Sheet method 'insertImage(url, column, i)'
    }
    // else error: no file found
  }
  // else error: no folder found
}


