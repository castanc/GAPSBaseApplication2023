
//https://gistlib.com/javascript/crop-image-base64-in-javascript

function cropImage0(base64String,w,h) {
    //const base64String = "data:image/png;base64,iVBORw0KG...";

    // create an image
    const img = new Image();
    img.src = base64String;

    // set up canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // wait for image to load
    img.onload = function () {
        // set the position for the cropped image
        const croppedX = 50;
        const croppedY = 50;

        // draw the cropped image onto the canvas element
        context.drawImage(img, croppedX, croppedY, w, h, 0, 0, croppedWidth, croppedHeight);

        // convert the cropped image on the canvas back to base64
        const croppedBase64String = canvas.toDataURL();
        return croppedBase64String;

        // do something with the cropped image string, such as displaying it on a webpage
    }.onerror = function(err) {
        logDebug("error cropping image",err);
                // set the position for the cropped image
                const croppedX = 50;
                const croppedY = 50;
        
                // w = img.width*.2;
                // h =  img.width*.2
                // draw the cropped image onto the canvas element
                context.drawImage(img, croppedX, croppedY,w, h, 0, 0, w, h);
        
                // convert the cropped image on the canvas back to base64
                const croppedBase64String = canvas.toDataURL();
                let ctl = document.getElementById("divThumbnail");
                ctl.appendChild(canvas);

                let imgtag = `<img src="${base64String}" width=${w}px">`
                writeInnerHTML("divImage",imgtag);

                return croppedBase64String;
        
    };
}


function cropImage(base64String,w,h)
{

// create an image
const img = new Image();
img.src = base64String;

// set up canvas element
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

// wait for image to load
img.onload = function() {
  // set the dimensions for the cropped image
  const croppedWidth = w;
  const croppedHeight = h;
  
  // set the position for the cropped image
  const croppedX = 540; //50;
  const croppedY = 540; //50;
  
  // draw the cropped image onto the canvas element
  context.drawImage(img, croppedX, croppedY, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);
  
  // convert the cropped image on the canvas back to base64
  const croppedBase64String = canvas.toDataURL();
  let imgtag = `<img src="${croppedBase64String}" width=${w}px">`
  let imgfull = `<img src="${base64String}" width=${w}px height="${h}">`;

  writeInnerHTML("divThumnail",imgtag);
  writeInnerHTML("divImage",imgfull);

  return croppedBase64String;

  // do something with the cropped image string, such as displaying it on a webpage
};
}