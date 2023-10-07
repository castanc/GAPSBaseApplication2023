function getFoldersInfo() {
    let rows = [];
    let folders = DriveApp.getFolders();
    while (folders.hasNext()) {
      var folder = folders.next();
      let row = [folder.getName()]; //,folder.getDateCreated(),folder.getLastUpdated(), folder.getId(),folder.getUrl()];
      rows.push(row);
    }
    return rows.sort();
  }
  
  
  
  function getFilesInfo(folderName = "") {
  
    let rows = [];
    let folders
    if (folderName == "")
      folders = DriveApp.getFolderById();
    else
      folders = DriveApp.getFoldersByName(folderName);
  
    if (folders.hasNext()) {
      // Assume folder name is unique, so use first match
      var folder = folders.next();
  
      var files = folder.getFiles();
      rows.push(["FileName", "Ext", "Size", "DateCreated", "DateLastAccess", "Id"]);
      while (files.hasNext()) {
        var file = files.next();
        let fName = file.getName();
        let ext = "";
        let ix = file.getName().lastIndexOf(".");
        if (ix > 0) {
  
          fName = file.getName().substring(0, ix - 1);
          ext = file.getName().substring(ix + 1).toLowerCase();
        }
        //let row = [rows.length, fName,ext, file.getSize(), file.getDateCreated(), file.getLastUpdated(), file.getId()];
        let row = [fName, ext, file.getSize(), file.getDateCreated(), file.getLastUpdated(), file.getId()];
        rows.push(row);
      }
    }
    return rows;
  }
  