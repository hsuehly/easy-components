import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload, UploadFile } from "./upload";

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert("文件太大");
    return false;
  }
  return true;
};
const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type });
  return Promise.resolve(newFile);
};
const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action("change")}
      // beforeUpload={filePromise}
      defaultFileList={defaultFileList}
      name="filename"
      data={{ key: "value" }}
      headers={{ "X-Powered-By": "hsueh" }}
      // accept=".jpg"
      multiple
      drag
    ></Upload>
  );
};

storiesOf("Upload component", module).add("Upload", SimpleUpload);
