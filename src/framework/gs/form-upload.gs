function processForm(formObject) {

    result = {};
    result.code = -1;
    result.message = "File already uploaded";
    result.stack = "";
    result.url = "";
  
    try {
  
      let md5 = MD5(formObject.myFile);
      Logger.log(`md5:\t${md5}`);
  
  
      //RowId	Date	Time	url	DocDate	DocTime	Valor$	ValorUS$	Detalle	Beneficiario	Referencia	Origen	DocTexto	FileName	TipoDoc	FileHash
      /*
      myFile
      folder
      fecha
      valor
      valorDolares
      referencia
      detalle
      textoDoc
      tipoDoc
      origen
      
      */
  
      let sheet = getSheet(urlData, md5);
      if (sheet != null) {
        var folder = getCreateFolder(formObject.folder);
  
        var formBlob = formObject.myFile;
        var file = folder.createFile(formBlob);
  
        sheet.appendRow([
          sheet.getLastRow + 1,
          new date(),
          null,
          formObject.fecha,
          null,
          formObject.valor,
          formObject.valorDolares,
          formObject.referencia,
          formObject.detalle,
          formObject.textoDoc,
          formObject.tipoDoc,
          formObject.origen],
          "N",
          md5,
          file.getUrl(),
        );
        result.code = 0;
        result.message = "File Saved Ok";
        result.url = file.getUrl();
      }
    }
    catch (ex) {
      result.code = 500;
      result.message = "Http Error 500";
      result.message = `Unhandled Exception: ${ex.messge}`;
      result.stack = ex.stack;
       throw new Error("New error message", { cause: ex });
    }
    return JSON.stringify(result);
  }