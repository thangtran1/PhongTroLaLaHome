import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputReadOnly, InputFormV2, Button } from "../../components";
import anonAvatar from "../../assets/anon.avatar.png";
import { apiUpdateUser } from "../../services";
import { fileToBase64, blobToBase64 } from "../../ultils/Common/toBase64";
import { getCurrent } from "../../store/actions";
import Swal from "sweetalert2";
const EditAccount = () => {
  const { currentData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    avatar: blobToBase64(currentData?.avatar) || "",
    fbUrl: currentData?.fbUrl || "",
    zalo: currentData?.zalo || "",
  });
  const handleSubmit = async () => {
    const response = await apiUpdateUser(payload);
    if (response?.data.err === 0) {
      Swal.fire(
        "Done",
        "Chỉnh sửa thông tin cá nhân thành công",
        "success"
      ).then(() => {
        dispatch(getCurrent());
      });
    } else {
      Swal.fire(
        "Oops!",
        "Chỉnh sửa thông tin cá nhân không thành công",
        "error"
      );
    }
  };

  const handleUploadFile = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0]);
    setPayload((prev) => ({
      ...prev,
      avatar: imageBase64,
    }));
  };
  return (
    <div className="flex flex-col h-full items-center ">
      <h1 className="text-3xl w-full text-start font-medium  py-4 border-b border-gray-200">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 flex items-center justify-center flex-auto">
        <div className=" py-6 flex flex-col gap-4 w-full ">
          <InputReadOnly
            direction="flex-row"
            label="Mã thành viên"
            value={
              `#${currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}` || ""
            }
          />
          <InputReadOnly
            editPhone
            direction="flex-row"
            label="Số điện thoại"
            value={currentData?.phone || ""}
          />

          <InputFormV2
            setValue={setPayload}
            name="name"
            label="Tên hiển thị"
            direction="flex-row"
            value={payload.name}
          />

          <InputFormV2
            setValue={setPayload}
            name="zalo"
            direction="flex-row"
            label="Zalo"
            value={payload.zalo}
          />
          <InputFormV2
            setValue={setPayload}
            name="fbUrl"
            direction="flex-row"
            label="Facebook"
            value={payload.fbUrl}
          />
          <div className="flex ">
            <label className="w-48 flex-none" htmlFor="Password">
              Mật khẩu
            </label>
            <small className="flex-auto text-blue-500 h-12 cursor-pointer">
              Đổi mật khẩu
            </small>
          </div>
          <div className="flex mb-6">
            <label className="w-48 flex-none" htmlFor="avatar">
              Ảnh đại diện
            </label>
            <div>
              <img
                src={payload.avatar || anonAvatar}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover"
              />
              <input
                onChange={handleUploadFile}
                type="file"
                className="appearance-none my-4"
              />
            </div>
          </div>
          <Button
            text="Cập nhật"
            bgColor="bg-blue-600"
            textColor="text-white"
            onClick={handleSubmit}
          />
          <div className="mb-20"></div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
