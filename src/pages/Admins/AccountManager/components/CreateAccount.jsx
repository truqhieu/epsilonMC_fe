import React, { useState } from "react";
import { TextField, Button, Typography, MenuItem } from "@mui/material";

const API_URL = "http://localhost:9999/api/admin"; 
const CreateAccount = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Tài khoản đã được tạo thành công!");
        setFormData({ email: "", password: "", role: "" });
      } else {
        alert(data.message || "Đã xảy ra lỗi khi tạo tài khoản.");
      }
    } catch (error) {
      alert("Lỗi kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 5, padding: "16px" }}>
        <Typography variant="h5" style={{ marginBottom: "16px" }}>
          Thêm tài khoản mới
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
          <TextField
            label="Mật khẩu"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField label="Vai trò" name="role" value={formData.role} onChange={handleChange} required select fullWidth>
            <MenuItem value="admin">Doctor</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="admin">Manage</MenuItem>
            <MenuItem value="user">Patient</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Đang xử lý..." : "Thêm tài khoản"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
