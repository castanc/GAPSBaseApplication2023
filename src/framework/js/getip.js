
var IPAddress="";
function getIP() {
    //https://www.geeksforgeeks.org/how-to-get-client-ip-address-using-javascript/
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("ip", data.ip);
        IPAddress = data.ip;
        console.log("IPADDRESS:", IPAddress);
        userStart();
      })
      .catch(error => console.error(error));
  
  }


  //check geolocation apo
  //https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  
  