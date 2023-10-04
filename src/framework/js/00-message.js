function dangerMessage(msg)
{
	writeInnerHTML(DIV_MESSAGES, `<p class="btn-danger">${msg}</p>`);
	scrollTo("top");
}


function warnMessage(msg)
{
	writeInnerHTML(DIV_MESSAGES, `<p class="btn-warning">${msg}</p>`);
	scrollTo("top");
}


function infoMessage(msg)
{
	writeInnerHTML(DIV_MESSAGES, `<p class="btn-info">${msg}</p>`);
	scrollTo("top");
}


function successMessage(msg)
{
	writeInnerHTML(DIV_MESSAGES, `<p class="btn-success">${msg}</p>`);
	scrollTo("top");
}
