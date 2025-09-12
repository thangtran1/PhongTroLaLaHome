# 🏠 Phòng Trọ Project

![License](https://img.shields.io/badge/license-MIT-green)
![Backend](https://img.shields.io/badge/Backend-Node.js-blue)
![Frontend](https://img.shields.io/badge/Frontend-React-blueviolet)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

> Hệ thống quản lý đăng tin phòng trọ với phân quyền người dùng và admin, hỗ trợ đăng, sửa, duyệt tin đăng, quản lý người dùng và vai trò.

---

## 📖 Mô tả dự án

**Phòng Trọ Project** là ứng dụng web giúp người dùng dễ dàng đăng tin thuê/phòng trọ và quản lý các bài đăng.  

**Tính năng chính:**  

- **Người dùng (`User`)**:  
  - Đăng bài trọ.  
  - Sửa/xóa bài của mình.  
  - Xem trạng thái bài đăng (chờ duyệt, đã duyệt).  

- **Quản trị viên (`Admin`)**:  
  - Duyệt hoặc từ chối bài đăng.  
  - Quản lý tất cả bài đăng.  
  - Quản lý người dùng và phân quyền.  

- Phân quyền rõ ràng: chỉ Admin mới duyệt bài và quản lý user.  
- Giao diện trực quan, responsive, thân thiện trên desktop và mobile.  

---

## 🛠️ Công nghệ sử dụng

### Backend
- Node.js & Express.js  
- Sequelize ORM + MySQL  
- JWT cho xác thực & phân quyền  
- REST API đầy đủ cho Frontend  

### Frontend
- React.js / Next.js  
- Redux cho quản lý state  
- Ant Design & Tailwind CSS  
- Axios để gọi API  

---

## ⚡ Tính năng nổi bật

1. **Đăng bài trọ:** User có thể đăng bài với tiêu đề, mô tả, ảnh, giá và diện tích.  
2. **Quản lý bài đăng:** User chỉnh sửa hoặc xóa bài của mình.  
3. **Duyệt bài:** Admin xem, duyệt hoặc từ chối các bài đăng.  
4. **Quản lý người dùng:** Admin phân quyền User/Admin.  
5. **UI đẹp & responsive**: Thân thiện trên cả desktop và mobile.  

---

