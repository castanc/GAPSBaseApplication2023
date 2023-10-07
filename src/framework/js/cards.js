const thumbWidth = 320;
const thumbHeight = 320;

function showCards(files, filter = "") {
    showControl(DIV_OPTIONS);
    showControl(DIV_CARDS);
    let html = "";
    let ps = [];
    pagePos = 0;
    let lastPos = pagePos;
  
    if (filter == "")
      ps = files.filter(x => x.Status == "");
    else {
      ps = files.filter(x => x.Status == "" &&
        (
          x.FileName.includes(filter.toLowerCase())
        ));
    }
  
    for (let i = 0; i < ps.length; i++) {
      if (i > ps.length) break;
      html = `${html}${paintCard(ps[i], i)}`;
      if (i > ps.length)
        break;
      lastPos = i;
    }
  
    pagePos = lastPos + 1;
    writeInnerHTML(DIV_CARDS, html);
    showControl(DIV_CARDS);
    hideControl(SPINNER);
  }
  
  function paintCard(p, i) {
    let card = "";
    let dimensions = "";
    let topbtn = `<i class="fa fa-home" onclick="scrollTo('top')" title="Inicio"></i>`;
    let btnEdit = `<i class="fas fa-edit" onclick="editDocument(${p.Order})" title="Edit"></i>`;
    let btnBack = ""; //`<i class="fas fa-arrow-alt-circle-left" onclick="closeQueryReservas()" title="Continuar Reservas"></i>`;;

    let imgHtml = "";
    let imgLink = "";
    if ( p.IsImage && p.Source == SOURCE_GDRIVE)
    {
      imgHtml= `<img src="${baseUrl1}${p.Id}" width="${thumbWidth}px" height="${thumbHeight}px">`;
      imgLink = `<a href="${baseUrl2}${p.Id}" target="blank">${imgHtml}</a>`;
    }
    else if ( p.IsImage && p.Source == SOURCE_LOCAL)
    {
      imgHtml= `<img src="${p.Base64Data}" width="${thumbWidth}px" height="${thumbHeight}px">`;
      imgLink = `<a href="${p.Base64Data}" target="blank">${imgHtml}</a>`;
    }

      console.log(imgHtml,p);
    
    
    let confirm = `    <label class="containerchb">Delete
  <input type="checkbox" ${getChecked(p.Delete)}">
  <span class="checkmark"></span>
</label>
`;

// confirm = `<div class="checkbox-container">
//   <input type="checkbox" id="cb${p.Order}" ${getChecked(p.Delete)}>
//   <label for="cb1">Delete</label>
// </div>`;

  
  
    let megas = getMB(p.Size);
    let name = ""; //p.FIleName
    
    card = `
      <hr>
          <li class="card" id="card_${p.Order}">
              <div class="card__content">
                  <div>
                      <div class="titulo"><b> ${name}</b></div>
                      <p class="sub-tiulo">${megas}; ${confirm}</p>
                    <h3>${dateString(new Date(p.DateLastAccess))}</h3>
            <div class="row">
              ${topbtn}${btnEdit}
            </div>
            <div id="msg_${p.RowId}" class="row">
            </div>
                  </div>
                  <figure>
                  ${imgLink}
                  </figure>
              </div>
          </li>
     `;
  
    return card;
  
  }
  
  