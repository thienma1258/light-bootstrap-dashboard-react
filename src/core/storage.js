import { getApp } from "@firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";

function generateUniqueKey(fileName) {
  const currentTs = new Date();
  let key = `${currentTs.getFullYear()}/${currentTs.getMonth()}/${currentTs.getDate()}/${currentTs.getHours()}/${(currentTs.getMinutes() * 60 + currentTs.getSeconds()) * 1000 + currentTs.getMilliseconds()}-${Math.round(Math.random() * 1000)}`;
  if (fileName !== "" ) {
    let extension = fileName.split(".").pop();
    key = `${key}${extension}`;
  }

  return key;
}

export const getStore = () => {
  if (!process.browser) return null;
  return getStorage(getApp(),"gs://avian-line-336407.appspot.com");
};

export const uploadFile = async ( file) => {
  const storage = getStore();
  if (!storage) return null;
  var filename = file.name;
  const storageRef = ref(storage, generateUniqueKey(filename));
  const result = await uploadBytes(storageRef, file);
  return getDownloadURL(result.ref);
};

export const uploadBase64File = async( base64file) => {
  const storage = getStore();
  if (!storage) return null;
  const base64Text = base64file.split(';base64,').pop();
  const imageBuffer = Buffer.from(base64Text, 'base64');
  const filename = ""
  const storageRef = ref(storage,generateUniqueKey(filename)+".jpg");
  const result = await uploadBytes(storageRef, imageBuffer);
  return getDownloadURL(result.ref);
};
