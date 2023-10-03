let beneficiarios = [];
let monedas = [];

function loadBaseData(result)
{
  let bd = JOSN.parse(result);

  for(let i=1;i<bd.Tabs[0].Data; i++)
  {
    for(let j=0; j<bd.Tabs[0].Data[0].length; j++)
    {
        let b = {};
        b[bd.Tabs[0].Data[0][j]] = bd.Tabs[0].Data[i][j];
        beneficiarios.push(b);
    }
  }
  buildSelectBeneficiarios();

  for(let i=1;i<bd.Tabs[1].Data; i++)
  {
    for(let j=0; j<bd.Tabs[0].Data[0].length; j++)
    {
        let m = {};
        m[bd.Tabs[0].Data[0][j]] = bd.Tabs[1].Data[i][j];
        monedas.push(m);
    }
  }
  buildSelectMonedas();
}



function downloadBaseData()
{
  logDebug(downloadBaseData.name,location.protocol);
  if ( location.protocol == K_HTTPS)
  {
    google.script.run.withSuccessHandler(loadData).withFailureHandler(failureCall).downloadBaseData();
  }
  else if ( baseData)
      loadBaseData(baseData);

}


function buildSelectBeneficiarios()
{
  let html = "";
  beneficiarios.forEach(x=>{
    html = `${html}<option value="${x.Id}">${x.Nombre}`;
  })
  html = `<select id="${FLD_BENEFICIARIOS}">${html}</select>`;
  writeInnerHTML(DIV_BENEFICIARIOS,html);
}


function buildSelectMonedas()
{
  let html = "";
  monedas.forEach(x=>{
    html = `${html}<option value="${x.Id}">${x.Pais}-${x.Nombre}`;
  })
  html = `<select id="${FLD_MONEDAS}">${html}</select>`;
  writeInnerHTML(DIV_MONEDAS,html);
}
