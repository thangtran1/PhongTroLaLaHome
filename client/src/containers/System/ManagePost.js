import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";
import { Button, UpdatePost } from "../../components";
import icons from "../../ultils/icons";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const { FaPencilAlt, MdAutoDelete } = icons;

const ManagePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("0");
  const { postOfCurrent, dataEdit } = useSelector((state) => state.post);

  useEffect(() => {
    setPosts(postOfCurrent);
  }, [postOfCurrent]);

  useEffect(() => {
    !dataEdit && dispatch(actions.getPostsLimitAdmin());
  }, [dataEdit, dispatch]);

  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);

  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa tin này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "No, Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeletePost(postId);
        if (response?.data.err === 0) {
          Swal.fire("Đã xóa!", "Tin đăng của bạn đã được xóa.", "success");
          dispatch(actions.getPostsLimitAdmin());
        } else {
          Swal.fire("Oops!", "Xóa tin đăng thất bại", "error");
        }
      }
    });
  };

  useEffect(() => {
    if (status === 1) {
      const activePost = postOfCurrent?.filter((item) =>
        checkStatus(item?.overview?.expired?.split(" ")[3])
      );
      setPosts(activePost);
    } else if (status === 2) {
      const expiredPost = postOfCurrent?.filter(
        (item) => !checkStatus(item?.overview?.expired?.split(" ")[3])
      );
      setPosts(expiredPost);
    } else {
      setPosts(postOfCurrent);
    }
  }, [status, postOfCurrent]);

  return (
    <div className="flex flex-col gap-6 ">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select
          value={status}
          onChange={(e) => setStatus(+e.target.value)}
          className="outline-none border p-2 border-gray-200 rounded-md"
        >
          <option value="0">Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hết hạn</option>
        </select>
      </div>
      <table className="w-full table-auto ">
        <thead>
          <tr className="flex w-full bg-gray-100">
            <th className="border flex-1 p-2">Mã tin</th>
            <th className="border flex-1 p-2">Ảnh đại diện</th>
            <th className="border flex-1 p-2">Tiêu đề</th>
            <th className="border flex-1 p-2">Giá</th>
            <th className="border flex-1 p-2">Ngày bắt đầu</th>
            <th className="border flex-1 p-2">Ngày hết hạn</th>
            <th className="border flex-1 p-2">Trạng thái</th>
            <th className="border flex-1 p-2">Trạng thái duyệt</th>
            <th className="border flex-1 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!posts || posts?.length === 0 ? (
            <tr>
              <td className="border border-gray-200 p-4">
                Bạn chưa có tin đăng nào. Bấm{" "}
                <span
                  className="  cursor-pointer text-blue-500 hover:text-blue-800 hover:underline"
                  onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
                >
                  vào đây
                </span>{" "}
                để bắt đầu đăng tin.
              </td>
            </tr>
          ) : (
            posts?.map((item) => {
              return (
                <tr className="flex items-center h-16" key={item.id}>
                  <td className="border px-2  flex-1 h-full flex items-center justify-center">
                    {item?.overview?.code}
                  </td>
                  <td className="border px-2  flex-1 h-full flex items-center justify-center-center justify-center">
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ""}
                      alt="avatar"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="border px-2  flex-1 h-full flex items-center justify-center">
                    {`${item?.title?.slice(0, 10)}...`}
                  </td>
                  <td className="border px-2  flex-1 h-full flex items-center justify-center">
                    {`${item?.attributes?.price?.slice(0, 20)}...`}
                  </td>
                  <td className="border px-2  flex-1 h-full flex items-center justify-center">
                    {item?.overview?.created}
                  </td>
                  <td className="border px-2  flex-1 h-full flex items-center justify-center">
                    {item?.overview?.expired}
                  </td>
                  <td className="border px-2  flex-1 h-full  flex items-center justify-center">
                    {checkStatus(item?.overview?.expired?.split(" ")[3])
                      ? "Đang hoạt động"
                      : "Đã hết hạn"}
                  </td>
                  <td className="border px-2 flex-1 h-full flex items-center justify-center">
                    {item?.status === "pending"
                      ? "Chưa duyệt"
                      : item?.status === "approved"
                      ? "Đã duyệt"
                      : "Không xác định"}
                  </td>
                  <td className="border gap-4 px-2  flex-1 h-full items-center justify-center flex ">
                    <Button
                      IcAfter={FaPencilAlt}
                      bgColor="bg-green-600"
                      textColor="white"
                      onClick={() => {
                        dispatch(actions.editData(item));
                        setIsEdit(true);
                      }}
                    />

                    <Button
                      IcAfter={MdAutoDelete}
                      bgColor="bg-orange-600"
                      textColor="white"
                      onClick={() => handleDeletePost(item.id)}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
