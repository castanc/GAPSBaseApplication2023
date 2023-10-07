var stage = [];
var sheet = {};
var baseUrl = "https://drive.google.com/file/d/";
const baseUrl1 = "https:" + "/" + "/" + "drive.google.com/uc?export=view&id=";
const baseUrl2 = "https:" + "/" + "/" + "drive.google.com/file/d/";
let ixDoc = 1;
//https://drive.google.com/uc?id=19V4vTvoFlrjvPs6oQIrZ7yYecdoYl3rD&export=download
//https://drive.google.com/file/d/19EMhlBFlxPiOqtSjvMJqx0AltPAlwI2p/view?usp=drivesdk




function home() 
{
  scrollTo(DIV_MESSAGES);

}


function selectFiles() {

  let promise = openFileOrFiles(".jpg,.jpeg,.png,.bmp,.txt,.pdf", false);

  promise.then(
    function (files) {
      paintThumbnail(files);
    },
    function (error) {
      console.log("error", error)
    }
  );
}


function paintThumbnail(file)
{
  logDebug(paintThumbnail.name,file);
  currentIx = 0;
  loadFile(file,true);
}




function saveData(key, result) {
  if (saveServerData)
    localStorage.setItem(key, result);
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
      logFuncDebug(loadData.name,o);
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



function createThumbNails() {
  thumbNails = [];

  for(let i=0; i< stage.length;i++)
  {
    console.log(createThumbNails.name,i,stage[i]);
    if (stage[i].IsImage) {
      currentIx = stage[i].Order;
      getImages(stage[i].ImgLink);
    }
    else console.log("p is not image");

  }
  // pics.every(p => {
  //   console.log(createThumbNails.name,p);
  //   if (p.IsImage) {
  //     currentIx = p.Order;
  //     getImages(p.ImgLink);
  //     if (location.protocol != K_HTTPS)
  //       return false;
  //   }
  // });
  saveData("resolved-thumbnails",JSON.stringify(stage));
}


function sortDown(env)
{
  if ( env == 'remote')
  {
      stage = stage.sort((a,b) => a.LastModifiedDate < b.LastModifiedDate);
      showCards(stage);
  }
}

function sortUp(env)
{
  if ( env == 'remote')
  {
      stage = stage.sort((a,b) => a.LastModifiedDate > b.LastModifiedDate);
      showCards(stage);
  }

}