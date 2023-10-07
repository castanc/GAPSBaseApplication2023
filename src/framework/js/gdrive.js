let driveVisible = false;
const DIV_DRIVE = "divSelectDrive";
const DIV_SELECT_FOLDER = "divSelectFolder";
const DIV_FOLDER_SELECTOR  = "fldFolderSelector";
const KEY_FOLDERS = "keyFolders";

let folderName = "";



function getFoldersInfo() {
  logDebug(downloadStageFiles.name, location.protocol);
  if (location.protocol == K_HTTPS) {
    logDebug("downloading Stage");
    google.script.run.withSuccessHandler(loadFolders).withFailureHandler(failureCall).downloadFoldersInfo();
  }
  else if (stageData)
    loadData(stageData);

}



function assignFolder(val)
{
  folderName = val;
  downloadStageFiles(folderName);
}

function buildSelectFolders(folders)
{
    let html = "";
    let options = "";
    for(let i=0;i<folders.length;i++)
    {
        options = `${options}<option value="${folders[i]}">${folders[i]}</option>`;
    }
    html = `<select id="fldFolderSelector" onchange="assignFolder(this.value)">${options}</select>`;
    writeInnerHTML(DIV_SELECT_FOLDER,html);
}

function toggleDrive(){
    driveVisible = !driveVisible;
    if ( driveVisible)
    {
        showControl(DIV_DRIVE)
    }
    else hideControl(DIV_DRIVE);
}


function loadFolders(result) {
  let folders = [];
  saveData(KEY_FOLDERS, result);
    let ro = JSON.parse(result);
    if (ro.Code == 0) {
      logDebug(loadData.name, "sucess getFolders")
      for (let i = 0; i < ro.Content.length; i++) {
        folders.push(ro.Content[i][0]);
      }
    }
    else {
      logDebug(loadData.name, "SERVER EXCEPTION");
      logDebug(ro);
    }
    hideControl(DIV_WELCOME);
    buildSelectFolders(folders);
    driveVisible = true;
    showControl(DIV_DRIVE)
  }
  