let json = "";
json ='<?!= getLoggedUser(); ?>';


function userStart(){
    logDebug(userStart.name, "start app");
    if ( mobile) hideControl(ICON_HOME);
    //downloadStageFiles();
    //downloadBaseData();
    //getFoldersInfo();
  

    
}