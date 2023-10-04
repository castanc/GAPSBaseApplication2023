function showControl(ctl, scrollToTop = true) {
	let control = document.getElementById(ctl);
	if (control) {
		control.style.display = "block";
		if (scrollToTop == true)
			control.scrollIntoView(true);
	}
}


function hideControl(ctl) {
	let control = document.getElementById(ctl);
	if (control) {
		control.style.display = "none";
	}
}


function getChecked(val)
{
	if ( val) return `checked`;
	return "";
}

function protectField(fldId, val = true) {
	let ctl = document.getElementById(fldId)
	if (ctl)
		ctl.disabled = val;
}

function scrollTo(ctlId)
{
	let control = document.getElementById(ctlId);
	if (control) {
			control.scrollIntoView(true);
	}

}

function writeInnerHTML(divId, html) {
	let ctl = document.getElementById(divId);
	if (ctl)
		ctl.innerHTML = html;
}


function writeInnerText(ctlId, text) {
	let ctl = document.getElementById(ctlId);
	if (ctl)
		ctl.innerText = text;
}



function getMB(size) {
	let megas = "";
	let m = size / 1024 / 1024;
	megas = m.toString();
	let ix = megas.indexOf(".");
	if (ix > 0 && megas.length > ix + 2)
		megas = megas.substring(0, ix + 2);

	megas = `${megas}MB`;
	return megas;

}

function setFocus(ctlid) {
	let ctl = document.getElementById(ctlid);
	if (ctl)
		ctl.focus();
}

function validateCutPaste(action) {
	dangerMessage(`No puede usar esta accion [${action}] en este campo`);
	return false

}

function toggleUserView() {

}

function dateString(dt)
{
	return `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()}`;
}


function toggleSettings() {

}

function clearControl(id) {
	let ctl = document.getElementById(id);
	if (ctl)
		ctl.innerHTML = "";

}

function getFileType(ext) {
	if (!ext) return "";
	if (".jpg.jpeg.bmp.png".includes(ext)) return "IMAGE";
	else if (".txt".includes(ext)) return "PLAIN_TEXT";
	else if (".pdf".includes(ext)) return "PDF";
	else if (".xls.xlsx".includes(ext)) return "EXCEL";
	else if (".doc.docx".includes(ext)) return "WORD";
	else if (".ts.cs.py.js.html.htm".includes(ext)) return "CODE";
	else if (".mp3.wav".includes(ext)) return "AUDIO";
	else if (".mp4.mpg.mpeg.webm".includes(ext)) return "VIDEO";
	return "OTHER"

	return "";
}
