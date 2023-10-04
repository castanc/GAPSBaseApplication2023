function copyDebug() {
	let text = getCtlValue(fldDebug);
	copyToClipboard(text);
	infoMessage(msg[5]);
}
function logException(ex, method = "") {
	let msg = `EXCEPTION AT: ${method}\n${ex.message}\n${ex.stack} `;
	logDebug(msg);
	dangerMessage(msg);
	console.error(msg);
}
function logDebug(line) {
	console.log(line);
}


function logDebug(func,obj) {
	console.log(func,obj);
	infoMessage(`${func}() ${JSON.stringify(obj)}`);
}

function logFuncDebug(func,obj) {
	console.log(func,obj);
}


function clearDebug() {
	setCtlValue("debug", "");
}
function generateSelect(arr) {
	let options = "";
	for (let i = 0; i < arr.length; i++) {
		options = `${options}<option value="${arr[i]}">${arr[i]}</option>`;
	}

	return `<select onchange='selectOption(this.id,this.value)'">${options}</select> `;
}




function load(url) {
	let msg = `url:${url}\njson:${json}`;
	alert(msg);
}

function toggleDebug() {
	debugMode = !debugMode;
	if (debugMode)
		showControl(ICON_DEBUG);
	else
		hideControl(ICON_DEBUG);
}

