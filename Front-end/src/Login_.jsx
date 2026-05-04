import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/axios";
import { User, Eye, EyeOff, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    const token = localStorage.getItem("token");
    if (token && role) {
      navigate(role === "manager" ? "/manager" : "/cashier");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", formData);
      const { user, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user_role", user.role);
      localStorage.setItem("user_name", user.name);

      if (user.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/cashier");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      } else if (err.response?.status === 403) {
        setError(err.response.data.message); // رسالة الحساب المعطل
      } else if (err.code === "ERR_NETWORK") {
        setError("تعذر الاتصال بالسيرفر، تأكد من تشغيل Laravel");
      } else {
        setError("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <div style={styles.iconBg}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
        </div>

        <h2 style={styles.brandName}>Sales Manager</h2>
        <p style={styles.welcomeText}>يرجى تسجيل الدخول للمتابعة</p>

        {error && <div style={styles.errorBadge}>⚠️ {error}</div>}

       <form onSubmit={handleSubmit} style={styles.form}>
  <div style={styles.inputGroup}>
    <label style={styles.label}>اسم المستخدم</label>
    <div style={styles.inputWrapper}>
      <input
        type="text"
        name="username"
        value={formData.username}
        placeholder="أدخل اسم المستخدم"
        style={styles.input}
        onChange={handleChange}
        required
      />
      <span style={styles.inputIcon}>
        <User size={18} color="#64748b" />
      </span>
    </div>
  </div>

  <div style={styles.inputGroup}>
    <label style={styles.label}>كلمة المرور</label>
    <div style={styles.inputWrapper}>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        placeholder="********"
        style={styles.input}
        onChange={handleChange}
        required
      />
      <span style={styles.inputIcon}>
        <Lock size={18} color="#64748b" />
      </span>
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={styles.eyeButton}
      >
        {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
      </button>
    </div>
  </div>

  <button
    type="submit"
    style={{
      ...styles.loginBtn,
      cursor: loading ? "not-allowed" : "pointer",
    }}
    disabled={loading}
  >
    {loading ? "جاري التحقق من البيانات..." : "تسجيل دخول"}
  </button>
</form>
      </div>
    </div>
  );
};
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155",
    textAlign: "right",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px 42px 12px 42px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    backgroundColor: "#f8fafc",
    transition: "all 0.2s",
    outline: "none",
    boxSizing: "border-box",
    textAlign: "right",
  },
  inputIcon: {
    position: "absolute",
    right: "14px",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  eyeButton: {
    position: "absolute",
    left: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "0",
    color: "#64748b",
  },
  loginBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "16px",
    marginTop: "10px",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
    transition: "background 0.3s",
  },
  errorBadge: {
    backgroundColor: "#fef2f2",
    color: "#ef4444",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "15px",
    border: "1px solid #fee2e2",
    textAlign: "center",
  },
  eyeIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    transition: "color 0.3s",
    zIndex: 10,
  },

  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "20px",
    direction: "rtl",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px 30px",
    borderRadius: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
    border: "1px solid #f1f5f9",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },
  iconBg: {
    backgroundColor: "#14b8a6",
    width: "70px",
    height: "70px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    color: "#1e293b",
    fontSize: "22px",
    fontWeight: "700",
    margin: "10px 0",
  },
  welcomeText: { color: "#64748b", fontSize: "14px", marginBottom: "30px" },
  extraActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    fontSize: "13px",
  },
  rememberMe: {
    color: "#64748b",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  forgotPass: { color: "#14b8a6", textDecoration: "none" },
  footer: { marginTop: "30px", color: "#94a3b8", fontSize: "12px" },
  secureText: {
    letterSpacing: "1px",
    fontWeight: "bold",
    display: "block",
    marginTop: "5px",
  },
};

export default Login;
