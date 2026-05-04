import React, { useState, useEffect } from "react";
import api from "./api/axios";


const Employees = () => {
  console.log("SCRUM-38 update");

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "cashier",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleEditClick = (emp) => {
    setIsEditing(true);
    setEditId(emp.id);
    setFormData({
      name: emp.name,
      username: emp.username,
      password: "",
      role: emp.role,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("انتهت جلسة العمل، يرجى تسجيل الدخول");
      }
      console.error("خطأ في جلب البيانات", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await api.put(`/employees/${editId}`, formData);
        alert("تم تحديث بيانات الموظف بنجاح");
      } else {
        await api.post("/employees", formData);
        alert("تمت إضافة الموظف بنجاح");
      }

      setFormData({ name: "", username: "", password: "", role: "cashier" });
      setIsEditing(false);
      setEditId(null);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || "فشلت العملية");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الموظف نهائياً؟")) {
      try {
        await api.delete(`/employees/${id}`);
        setEmployees(employees.filter((emp) => emp.id !== id));
        alert("تم حذف الموظف بنجاح");
      } catch (err) {
        console.error(err);
        alert("خطأ في عملية الحذف");
      }
    }
  };

  const handleToggleStatus = async (emp) => {
    const newStatus = emp.status === "active" ? "inactive" : "active";
    try {
      console.log("Sending status:", newStatus, "to user:", emp.id);

      const response = await api.put(`/employees/${emp.id}`, {
        status: String(newStatus),
      });

      console.log("Server response:", response.data);

      setEmployees(
        employees.map((e) =>
          e.id === emp.id ? { ...e, status: newStatus } : e,
        ),
      );
    } catch (err) {
      console.error("Error details:", err.response?.data);
      alert(`خطأ: ${err.response?.data?.message || "تعذر تغيير حالة الموظف"}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>إدارة الموظفين</h2>
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <input
          style={styles.input}
          name="name"
          placeholder="الاسم الثلاثي"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          name="username"
          placeholder="اسم المستخدم (Login)"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          style={styles.input}
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="cashier">كاشير</option>
          <option value="manager">مدير نظام</option>
        </select>
        <button
          type="submit"
          style={{
            ...styles.addBtn,
            backgroundColor: isEditing ? "#3b82f6" : "#10b981",
          }}
          disabled={loading}
        >
          {loading
            ? "جاري الحفظ..."
            : isEditing
              ? "تحديث البيانات ✓"
              : "إضافة موظف +"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setFormData({
                name: "",
                username: "",
                password: "",
                role: "cashier",
              });
            }}
            style={{
              ...styles.addBtn,
              backgroundColor: "#6b7280",
              marginRight: "10px",
            }}
          >
            إلغاء
          </button>
        )}
      </form>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>الاسم</th>
              <th style={styles.th}>اسم المستخدم</th>
              <th style={styles.th}>الصلاحية</th>
              <th style={styles.th}>تاريخ الإنشاء</th>
              <th style={styles.th}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                style={{
                  ...styles.tr,
                  opacity: emp.status === "inactive" ? 0.6 : 1,
                }}
              >
                <td style={styles.td}>{emp.name}</td>
                <td style={styles.td}>{emp.username}</td>
                <td style={styles.td}>
                  <span
                    style={
                      emp.role === "manager"
                        ? styles.badgeManager
                        : styles.badgeCashier
                    }
                  >
                    {emp.role === "manager" ? "مدير" : "كاشير"}
                  </span>
                </td>
                <td style={styles.td}>
                  {new Date(emp.created_at).toLocaleDateString("ar-EG")}
                </td>
                <td style={styles.td}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => handleToggleStatus(emp)}
                      style={{
                        ...styles.actionBtn,
                        color: emp.status === "active" ? "#f59e0b" : "#10b981",
                      }}
                      title={emp.status === "active" ? "حظر" : "تفعيل"}
                    >
                      {emp.status === "active" ? "🚫 حظر" : "✅ تفعيل"}
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      style={{ ...styles.actionBtn, color: "#ef4444" }}
                      title="حذف"
                    >
                      🗑️ حذف
                    </button>
                    <button
                      onClick={() => handleEditClick(emp)}
                      style={{ ...styles.actionBtn, color: "#3b82f6" }}
                      title="تعديل"
                    >
                      ✏️ تعديل
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  actionBtn: {
    background: "none",
    border: "1px solid currentColor",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    transition: "0.2s",
  },
  statusActive: { color: "#10b981", fontWeight: "bold" },
  statusInactive: { color: "#ef4444", fontWeight: "bold" },
  container: { padding: "20px", direction: "rtl" },
  title: { color: "#1f2937", marginBottom: "20px" },
  formCard: {
    display: "flex",
    gap: "10px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    outline: "none",
    flex: 1,
    minWidth: "150px",
  },
  addBtn: {
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "right" },
  th: {
    backgroundColor: "#f9fafb",
    padding: "15px",
    color: "#4b5563",
    borderBottom: "1px solid #edf2f7",
  },
  td: { padding: "15px", borderBottom: "1px solid #f3f4f6" },
  badgeManager: {
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  badgeCashier: {
    backgroundColor: "#d1fae5",
    color: "#059669",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },
};

export default Employees;
