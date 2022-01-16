import React from "react";
import { uploadFile } from "core/storage";

import { CKEditor } from "ckeditor4-react";

import { useState, memo, useEffect } from "react";

// Import bootstrap(v3 or v4) dependencies
const config = {};

var loadingConfig = false;

if (!loadingConfig) {
  config.toolbarGroups = [
    { name: "document", groups: ["mode", "document", "doctools"] },
    { name: "clipboard", groups: ["clipboard", "undo"] },
    {
      name: "editing",
      groups: ["find", "selection", "spellchecker", "editing"],
    },
    { name: "forms", groups: ["forms"] },
    "/",
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    "/",
    {
      name: "paragraph",
      groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"],
    },
    { name: "links", groups: ["links"] },
    { name: "insert", groups: ["insert"] },
    "/",
    { name: "styles", groups: ["styles"] },
    { name: "colors", groups: ["colors"] },
    { name: "tools", groups: ["tools"] },
    { name: "others", groups: ["others"] },
  ];
  config.extraPlugins= "justify,font,colorbutton";
  // config.toolbar = [
  // 	{ name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
  // 	{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
  // 	{ name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
  // 	{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
  // 	'/',
  // 	{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
  // 	{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
  // 	{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
  // 	{ name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
  // 	'/',
  // 	{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
  // 	{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
  // 	{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
  // ];
}

function TextEditor({ onChange, initText }) {
  const [fileUpload, setFileUpload] = useState("");

  const changeHandler = async (event) => {
    if (event.target.files[0] != undefined) {
      let newURL = await uploadFile(event.target.files[0]);
      setFileUpload(newURL);
    }
  };
  if (initText == null) {
    return <div></div>;
  } else {
    return (
      <div className="App">
        <input type="file" name="file" onChange={changeHandler} />
        <p></p>
        {fileUpload.length > 0 ? <div>{fileUpload}</div> : ""}
        <CKEditor
          initData={initText}
          config={config}
          name="myeditor"
          onChange={(e) => {
            if (typeof e.editor !== "undefined" && e.editor) {
              onChange(e.editor.getData().toString());
            }
          }}
          onBeforeLoad={(CKEDITOR) => {
            if (!loadingConfig) {
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
