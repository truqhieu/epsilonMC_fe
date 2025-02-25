import React, { useEffect, useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, CircularProgress, Button 
} from "@mui/material";
import { useNavigate } from "react-router-dom"; 

const API_URL = "http://localhost:9999/api/admin";

const ViewAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (response.ok) {
        setAccounts(data.accounts || []);
      } else {
        alert(data.message || "Lỗi khi tải danh sách tài khoản.");
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
        <Typography variant="h5" style={{ marginBottom: "16px", textAlign: "center" }}>
          Danh sách tài khoản
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/admin/tao-tai-khoan")} 
          style={{ marginBottom: "16px", backgroundcolor: "red" }} 
        >
          Thêm Account
        </Button>

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Vai trò</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account._id}>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>{account.role}</TableCell>
                    <TableCell>{account.active ? "Hoạt động" : "Vô hiệu"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default ViewAccounts;
