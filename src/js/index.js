var stage = [];
var sheet = {};
var baseUrl = "https://drive.google.com/file/d/";




function home() {

console.log("home");

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

const baseurl1 = "https:" + "/" + "/" + "drive.google.com/uc?export=view&id=";
const baseUrl2 = "https:" + "/" + "/" + "drive.google.com/file/d/";
//https://drive.google.com/uc?id=19V4vTvoFlrjvPs6oQIrZ7yYecdoYl3rD&export=download
//https://drive.google.com/file/d/19EMhlBFlxPiOqtSjvMJqx0AltPAlwI2p/view?usp=drivesdk


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
      o.Status = "";
      o.IsImage = getFileType(o.Ext) == "IMAGE";
      o.IsPDF = getFileType(o.Ext) == "PDF";
      o.IsText = getFileType(o.Ext) == "TEXT";
      o.Url = `${o.ViewUrl}`;
      o.ThumbnailData = "";
      o.ImgHtml = `<img src="${o.ViewUrl}" width="120">`;
      o.LinkHtml = `<a href="${o.ViewUrl}" target="blank">${o.Order}.</a>`;


      o.ImgLink = `${baseUrl2}${o.Id}/view`;
      o.ImgThumbnail = `<img src="${o.ThumbNailUrl}" width="120px">`;
      o.ImgHtml = `<img src="${baseurl1}${o.Id}" width="120px">`;
      o.LinkHtml = `<a href="${o.ImgLink}" target="blank">View File</a>`;


      stage.push(o);
    }
  }
  else {
    logDebug(loadData.name, "SERVER EXCEPTION");
    logDebug(ro);
  }
  saveData("stage-objects", JSON.stringify(stage));
  createThumbNails(stage);
  showCards(stage);
}

function createThumbNails(pics) {
  thumbNails = [];
  pics.every(p => {
    if (p.IsImage) {
      currentIx = p.Order;
      getImages(p.ImgLink);
      if (location.protocol != K_HTTPS)
        return false;
    }
  });
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