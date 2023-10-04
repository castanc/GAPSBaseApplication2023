let dataVisible = false;
let docData = [];

function toggleEdit()
{
    dataVisible = !dataVisible;
    if ( dataVisible)
        showControl(DIV_EDIT_DATA);
    else 
        hideControl(DIV_EDIT_DATA);
}

function editDocument(order)
{
    dataVisible = false;
    toggleEdit();
    console.log(editDocument.name,order);
    let p = stage.filter(x=>x.Order==order);
    console.log(p);
    if ( p.length > 0 )
    {
        hideControl(DIV_OPTIONS);
        hideControl(DIV_MAIN_MENU);
        hideControl(DIV_CARDS);
        showControl(DIV_EDIT_DOCUMENT);

        let imgHtml= `<img src="${baseUrl1}${p[0].Id}" width="540px">`;
        let imgLink = `<a href="${baseUrl2}${p[0].Id}" target="blank">${imgHtml}</a>`;
        console.log(imgHtml);

        writeInnerHTML(DIV_IMAGE_EDIT,imgHtml);

        let ctl = document.getElementById("divData");
        if ( ctl) {
            ctl.style.backgroundImage =  `url(${imgHtml})|none|initial|inherit`;
        }
    
    }
    else dangerMessage(`Image ${order} not found`);
}

function closeEdit(){
    showControl(DIV_OPTIONS);
    showControl(DIV_CARDS);
    showControl(DIV_MAIN_MENU);
    hideControl(DIV_EDIT_DOCUMENT);

}

function closeDocData(){
    dataVisible = false;
    hideControl(DIV_EDIT_DATA);

}

