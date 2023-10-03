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
    let topbtn = `<i class="fa fa-home" onclick="showControl('top')" title="Inicio"></i>`;
    let btnEdit = `<i class="fas fa-edit" onclick="editDocument(${p.Order})" title="Edit"></i>`;
    let btnBack = ""; //`<i class="fas fa-arrow-alt-circle-left" onclick="closeQueryReservas()" title="Continuar Reservas"></i>`;;
  
  
    let megas = getMB(p.Size);
    
    card = `
      <hr>
          <li class="card" id="card_${p.Order}">
              <div class="card__content">
                  <div>
                      <div class="titulo"><b> ${p.FileName}</b></div>
                      <p class="sub-tiulo">${megas} ${dimensions}</p>
                    <h3>${new Date(p.DateLastAccess)}</h3>
            <div class="row">
              ${topbtn}${btnBack}${btnEdit}
            </div>
            <div id="msg_${p.RowId}"" class="row">
            </div>
                  </div>
                  <figure>
                    ${p.LinkHtml}
                    ${p.ImgThumbnail}
                  </figure>
              </div>
          </li>
     `;
  
    return card;
  
  }
  
  