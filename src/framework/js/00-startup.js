if ( location.protocol == K_HTTPS)
  guser = JSON.parse(json);

logDebug("",guser);


// Prevent forms from submitting.
 function startUp() {
    let forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
        event.preventDefault();
      });
    }
    getIP();
  }
  window.addEventListener('load', startUp);



  