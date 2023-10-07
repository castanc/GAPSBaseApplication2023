

function selectFiles() {

  stage = [];
  let promise = openFileOrFiles(".jpg,.jpeg,.png,.bmp,.txt,.pdf", true);

  promise.then(
    function (files) {
      loadFiles(files);
    },
    function (error) {
      console.log("error", error)
    }
  );
}

