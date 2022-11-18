import React, { Dispatch, SetStateAction, useState } from "react";
import { removeImageById, uploadImages } from "../../services/productService";
import { IProduct, Timage } from "../../redux/slices/productSlice";
import { Avatar, Badge, Image, BadgeProps } from "antd";
import { useAppSelector } from "../../redux/hooks";
import Resizer from "react-image-file-resizer";

import Loader from "../Loader";


interface IcomponentProps {
  formValue: IProduct;
  setFormValue: Dispatch<SetStateAction<IProduct>>;
}

const FileUploadFormComponent: React.FC<IcomponentProps> = ({
  formValue,
  setFormValue,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const fileUploadAndResize = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const resizedFiles = e.target.files;

    setLoading(true);
    try {
      if (resizedFiles) {
        for (let f = 0; f < resizedFiles.length; f++) {
          Resizer.imageFileResizer(
            resizedFiles[f],
            600,
            600,
            "JPEG",
            100,
            0,
            async (uri: any) => {
              try {
                const { public_id, secure_url } = await uploadImages(
                  user?.token,
                  {
                    image: uri,
                  }
                );
                setFormValue({
                  ...formValue,
                  images: [...formValue.images, { public_id, secure_url }],
                });
              } catch (error) {
                error instanceof Error
                  ? console.log(error.message)
                  : console.log(error);
              }
            }
          );
        }
      }
    } catch (error) {
      error instanceof Error ? console.log(error.message) : console.log(error);
    }
    setLoading(false);
  };

  const removeImageHandler = async (public_id: string) => {
    setLoading(true);
    const removedImage = await removeImageById(user?.token, public_id);

    if (removedImage === "ok") {
      setFormValue({
        ...formValue,
        images: formValue.images.filter(
          (i: Timage) => i.public_id !== public_id
        ),
      });
    }
    setLoading(false);
  };

  return (
    <div className="row p-3">
      {loading ? (
        <Loader />
      ) : (
        <>
          <label htmlFor="upload_image">Choose File</label>
          <input
            type="file"
            name="upload_image"
            id="upload_image"
            multiple
            accept="images/*"
            onChange={fileUploadAndResize}
            className="form-control mb-3"
          />

          {formValue.images.length > 0 &&
            formValue.images.map((i: Timage) => (
              <div
                key={i.public_id}
                className='m-2'
                style={{
                  position: "relative",
                }}
              >
                <span
                  className="badge badge-danger"
                  onClick={() => removeImageHandler(i.public_id)}
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    zIndex: "2",
                    borderRadius: "100%",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  x
                </span>
                <Avatar
                  size={100}
                  shape="square"
                  src={
                    <Image
                      src={i.secure_url}
                      style={{ width: 100, height: 100 }}
                    />
                  }
                ></Avatar>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default FileUploadFormComponent;
