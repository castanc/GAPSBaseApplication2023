let driveVisible = false;
const DIV_DRIVE = "divSelectDrive";
const DIV_SELECT_FOLDER = "divSelectFolder";
const DIV_FOLDER_SELECTOR  = "fldFolderSelector";
let folders = [];



function buildSelectFolders()
{
    let html = "";
    let options = "";
    for(let i=0;i<folders.length;i++)
    {
        options = `${options}<option value="${fodlers[i]}">${folders[i]}</option>`;
    }
    html = `<select id=fldFolderSelector>${options}</select>`;
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
    saveData("DRIVE_FOLDERS", result);
    let ro = JSON.parse(result);
    if (ro.Code == 0) {
      logDebug(loadData.name, "sucess getFolders")
      folders = [];
      for (let i = 1; i < ro.Content.length; i++) {
        folders.push(ro.Content[i][j]);
      }
    }
    else {
      logDebug(loadData.name, "SERVER EXCEPTION");
      logDebug(ro);
    }
    hideControl(DIV_WELCOME);
    buildSelectFolders();
    toggleDrive();
  }
  