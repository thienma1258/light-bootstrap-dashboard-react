import { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Modal, Button, Container } from "react-bootstrap";
import { uploadBase64File } from "core/storage";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const ImagePicker = ({
  showModal,
  onModalClose,
  imgURL,
  updateImageURL,
  onSaveHandler,
}) => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState((data) => data);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = async (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = async (e) => {
    if (typeof cropper !== "undefined") {
      let resultURL = cropper.getCroppedCanvas().toDataURL();
      let url = await uploadBase64File(resultURL);
      updateImageURL(url);
      handleClose();
    }
  };

  return (
    <Container>
      <Button onClick={handleShow}> Open image picker</Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div>
          <div style={{ width: "100%" }}>
            <input type="file" onChange={onChange} />
            <Cropper
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
          </div>
          <div>
            <h1>
              <button style={{ float: "right" }} onClick={getCropData}>
                Crop Image
              </button>
            </h1>
            <img style={{ width: "100%" }} src={cropData} alt="cropped" />
          </div>
          <br style={{ clear: "both" }} />
        </div>
      </Modal>
    </Container>
  );
};
export default ImagePicker;
