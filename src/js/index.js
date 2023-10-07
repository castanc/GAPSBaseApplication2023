var stage = [];
var sheet = {};
var baseUrl = "https://drive.google.com/file/d/";
const baseUrl1 = "https:" + "/" + "/" + "drive.google.com/uc?export=view&id=";
const baseUrl2 = "https:" + "/" + "/" + "drive.google.com/file/d/";
var gdriveFolder = "";
let ixDoc = 1;
//https://drive.google.com/uc?id=19V4vTvoFlrjvPs6oQIrZ7yYecdoYl3rD&export=download
//https://drive.google.com/file/d/19EMhlBFlxPiOqtSjvMJqx0AltPAlwI2p/view?usp=drivesdk




function home() 
{
  scrollTo(DIV_MESSAGES);

}



function paintThumbnail(file)
{
  logDebug(paintThumbnail.name,file);
  currentIx = 0;
  loadFile(file,true);
}




function saveData(key, result) {
  if (saveServerData)
  {
    logDebug(saveData.name,key);
    logDebug(result);
      localStorage.setItem(key, result);
  }
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