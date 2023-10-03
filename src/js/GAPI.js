let blobImage;
let base64Image = "";
let croppedImage = "";
let currentIx = 0;
let cropWidth = 480;
let cropHeight = 640;
var images = [];
var thumbNails = [];



function downloadStageFiles() {
    logDebug(downloadStageFiles.name, location.protocol);
    if (location.protocol == K_HTTPS) {
      logDebug("downloading Stage");
      google.script.run.withSuccessHandler(loadData).withFailureHandler(failureCall).downloadStageFiles();
    }
    else if (stageData)
      loadData(stageData);
  
  }



function getImages(url) {
    logDebug(getImages.name, url);
    if (location.protocol == K_HTTPS) {
        google.script.run.withSuccessHandler(downloadedImage).withFailureHandler(failureCall).getBlob(url);
    }
    else if (imageData)
        downloadedImage(imageData);
}





function downloadedImage(result) {
    saveData("image", result);
    //base64Image = `data:image/${stage[currentIx].Ext};base64,${window.btoa(blobImage)}`;
    let bext = stage[currentIx].Ext;
    if (bext == "jpg") bext = "jpeg";
    if (stage[currentIx].IsImage) {
        base64Image = `data:image/${bext};base64,${result}`;
        logDebug("base64 image", base64Image);
        //croppedImage = cropImage(base64Image,cropWidth,cropHeight);
        //stage[currentIx].ThumbNailData = croppedImage;
        stage[currentIx].ImgThumbnail = `<img src="${croppedImage}" width="${cropWidth}px" alt="Recargue página para ver las imágemes">`;
        logDebug("ImgThumbnail:", stage[currentIx].ImgThumbnail);
    }

}
  