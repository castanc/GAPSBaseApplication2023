function DownloadSheet(url) {
    Logger.log("DownloadSheet() url received:" + url);
    let result = {};
    let resultTabs = [];
    result.OutResult = 0;
    result.OutMessage = "";
    result.ProjectName = ""
    result.Url = url;
  
    let sheet = {};
  
    try {
      let ss = SpreadsheetApp.openByUrl(url);
      if (ss == null) {
        result.OutResult = -1;
        result.OutMessag = "Spreadsheet doesnt exist";
      }
      else {
        result.SheetName = ss.getName();
        let allSheets = ss.getSheets();
        for (let i = 0; i < allSheets.length; i++) {
          workItemResult = {};
          try {
            sheet.Name = allSheets[i].getName();
            sheet.Data = allSheets[i].getDataRange().getValues().filter(x => x.join("").trim() != "");
            sheet.Result = 0;
            sheet.Message = null;
          }
          catch (ex) {
            sheet.Result = -1;
            sheet.Message = ex.message;
          }
          resultTabs.push(sheet);
        }
      }
      result.Tabs = resultTabs;
    }
    catch (ex) {
      Logger.log("exception");
      Logger.Log(ex);
      result.OutResult = -1;
      result.OutMessage = ex.message;
      result.ex = ex;
    }
    return result;
  }