//https://web.dev/patterns/files/open-one-or-multiple-files/

const openFileOrFiles = async (extensions,multiple = false) => {
    // Feature detection. The API needs to be supported
    // and the app not run in an iframe.
    const supportsFileSystemAccess =
      "showOpenFilePicker" in window &&
      (() => {
        try {
          return window.self === window.top;
        } catch {
          return false;
        }
      })();
    // If the File System Access API is supported…
    if (supportsFileSystemAccess) {
      let fileOrFiles = undefined;
      try {
        // Show the file picker, optionally allowing multiple files.
        const handles = await showOpenFilePicker({ multiple });
        // Only one file is requested.
        if (!multiple) {
          // Add the `FileSystemFileHandle` as `.handle`.
          fileOrFiles = await handles[0].getFile();
          fileOrFiles.handle = handles[0];
        } else {
          fileOrFiles = await Promise.all(
            handles.map(async (handle) => {
              const file = await handle.getFile();
              // Add the `FileSystemFileHandle` as `.handle`.
              file.handle = handle;
              return file;
            })
          );
        }
      } catch (err) {
        // Fail silently if the user has simply canceled the dialog.
        if (err.name !== 'AbortError') {
          console.error(err.name, err.message);
        }
      }
      return fileOrFiles;
    }
    // Fallback if the File System Access API is not supported.
    return new Promise((resolve) => {
      // Append a new `<input type="file" multiple? />` and hide it.
      const input = document.createElement('input');
      input.style.display = 'none';
      input.type = 'file';
      input.accept= extensions;
      document.body.append(input);
      if (multiple) {
        input.multiple = true;
      }
      // The `change` event fires when the user interacts with the dialog.
      input.addEventListener('change', () => {
        // Remove the `<input type="file" multiple? />` again from the DOM.
        input.remove();
        // If no files were selected, return.
        if (!input.files) {
          return;
        }
        // Return all files or just one file.
        resolve(multiple ? Array.from(input.files) : input.files[0]);
      });
      // Show the picker.
      if ('showPicker' in HTMLInputElement.prototype) {
        input.showPicker();
      } else {
        input.click();
      }
    });
  };



  //todo: convert to Promise
  function loadFiles(files) {
		fileMode = "Binary";
    fileInfos = [];
    //readBase64 = true;

		// Loop through the FileList and render image files as thumbnails.
		//for (let i = 0, f; f = files[i]; i++) {
		for (let i = 0; i<files.length; i++) {

			var reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function (file) {
				fileName = file.name;
				selFile = {};
        selFile.Id = i;
				selFile.LastModifiedDate = file.lastModifiedDate;
				selFile.LastModified = file.lastModified;
				selFile.Size = file.size;
				selFile.Type = file.type;
				selFile.Name = file.name;
        selFile.IsImage = file.Type.includes("image");
        selFile.IsText = file.Type.includes("text");
        selFile.IsPDF = file.Type.includes("pdf");
        selFile.IsJavascript = file.Type.includes("javascript");
        selFile.IsHtml = file.Type.includes("html");
        selFile.IsApplication = file.Type.includes("application");
        selFile.Status = "";
        selFile.data;
    
				return function (e) {
    			let fileData = e.target.result;
		  		let ix = fileData.indexOf(K_BASE64);
					if (ix > 0) {
						selFile.data = fileData.substr(ix + token.length);
						try {
							if ( readBase64)
								selFile.data = atob(fileData);
							else selFile.data = fileData;
						}
						catch (ex) {
							logException(ex, `Decoding base64 data JSON. for ${selFile.name}\n${ex.message} `)
						}

					}
					else
						selFile.data = fileData;
          fileInfos.push(selFile);
				};
			})(files[i]);

			reader.onerror = function (error) {
				showSpinner(false);
				dangerMessage(msg[3], error);
				reader.abort();
			};

			reader.onabort = function (abort) {
				showSpinner(false);
				dangerMessage("File Reader operation aborted");
			}

			// Read in the image file as a data URL.
			if (readBase64)
				reader.readAsDataURL(files[i]);
			else
				reader.readAsText(files[i]);
		}
    return fileInfos;
	}




  function loadFile(file,readBase64) {
		fileMode = "Binary";
    fileInfos = [];
    //readBase64 = true;

		// Loop through the FileList and render image files as thumbnails.
		//for (let i = 0, f; f = files[i]; i++) {

			var reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function (file2) {
				fileName = file2.name;
				selFile = {};
        selFile.Order = fileInfos.length;
				selFile.LastModifiedDate = file2.lastModifiedDate;
				selFile.LastModified = file2.lastModified;
				selFile.Size = file2.size;
				selFile.Type = file2.type;
				selFile.Name = file2.name;
        selFile.IsImage = file2.type.includes("image");
        selFile.IsText = file2.type.includes("text");
        selFile.IsPDF = file2.type.includes("pdf");
        selFile.IsJavascript = file2.type.includes("javascript");
        selFile.IsHtml = file2.type.includes("html");
        selFile.IsApplication = file2.type.includes("application");
        selFile.Status = "";
        selFile.data;
    
				return function (e) {
    			selFile.data = e.target.result;
          fileInfos.push(selFile);
          croppedImage =  cropImage(selFile.data,540,540);

				};
			})(file);

			reader.onerror = function (error) {
				showSpinner(false);
				dangerMessage(msg[3], error);
				reader.abort();
			};

			reader.onabort = function (abort) {
				showSpinner(false);
				dangerMessage("File Reader operation aborted");
			}

			// Read in the image file as a data URL.
			if (readBase64)
				reader.readAsDataURL(file);
			else
				reader.readAsText(files[i]);
		
    return fileInfos;
	}
