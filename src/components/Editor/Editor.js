import React from "react";
import { uploadFile } from "core/storage";

import { CKEditor } from "ckeditor4-react";

import { useState, memo, useEffect } from "react";

// Import bootstrap(v3 or v4) dependencies
const config = {};

var loadingConfig = false;

if (!loadingConfig) {
}

function TextEditor({ onChange, initText }) {
  const [fileUpload, setFileUpload] = useState("");

  const changeHandler = async (event) => {
    if (event.target.files[0] != undefined) {
      let newURL = await uploadFile(event.target.files[0]);
      setFileUpload(newURL);
    }
  };
  if ( initText == null) {
    return <div></div>;
  } else {
    return (
      <div className="App">
        <input type="file" name="file" onChange={changeHandler} />
        <p></p>
        {fileUpload.length > 0 ? <div>{fileUpload}</div> : ""}
        <CKEditor
          initData={initText}
          // config={config}
          name="myeditor"
          onChange={(e) => {
            if (typeof e.editor !== "undefined" && e.editor) {
              onChange(e.editor.getData().toString());
            }
          }}
          onBeforeLoad={(CKEDITOR) => {
            if (!loadingConfig) {
              loadingConfig = true;
            }
          }}
          onInstanceReady={() => {
            console.log("Editor is ready!");
          }}
        ></CKEditor>
      </div>
    );
  }
}

export default memo(TextEditor);
