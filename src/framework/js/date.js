function getDateValue(ctl) {
	let field = document.getElementById(ctl);
	if (field) {
		return field.valueAsDate;
	}
	return null;
}

function getTimeValue(ctl) {
	let field = document.getElementById(ctl);
	if (field) {
		let dt = field.valueAsDate;
		let dt2 = new Date(0, 0, 0, dt.GetHours(), dt.GetMinutes().dt.GetSeconds());
	}
	return null;
}


function setDateTimeValue(dt2, ctl, tctl) {
	let dt = new Date(dt2);
	logDebug(setDateTimeValue.name, dt);
	let field = document.getElementById(ctl);
	let fieldt = document.getElementById(tctl);
	if (field)
		field.valueAsDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0);

	if (fieldt) {
		fieldt.valueAsDate = new Date(0, 0, 0, dt.getHours(), dt.getMinutes(), dt.getSeconds());
	}
}


function getDateTimeValue(dtCtl, tmCtl) {
	let ctl = document.getElementById(ctl);
	let ctlt = document.getElementById((tmCtl));
	let dt = new Date();
	if (ctl && !ctlt) {
		dt = new Date(`${ctl.value}T00:00`);
	}
	else {
		dt = new Date(`${ctl.value}T${ctlt.value}`);
	}
	logDebug(getDateTimeValue.name, dt);
}
