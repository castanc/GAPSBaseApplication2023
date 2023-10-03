let json = "";
json ='<?!= getLoggedUser(); ?>';


function userStart(){
    logDebug(userStart.name, "start app");
    downloadStageFiles();
    downloadBaseData();
  

    
}