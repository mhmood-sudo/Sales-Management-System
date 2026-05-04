import React, { useState, useEffect } from "react";
import Employees from "./Employees";
import InventoryManager from "./InventoryManager";
import api from "./api/axios";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    const sections = {
      inventory: <InventoryManager />,
      staff: <Employees />,
      damaged: <DamagedItems />,
      expenses: <ExpensesManager />,
      reports: <ReportsSection />,
      overview: <OverviewStats />
    };
    return sections[activeSection] || <OverviewStats />;
  };

  const handleLogout = () => {
    ["token", "user_role", "user_name"].forEach(k => localStorage.removeItem(k));
    window.location.href = "/";
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Sidebar - شريط جانبي عصري */}
      <aside style={{ 
        ...styles.sidebar, 
        width: isSidebarOpen ? "280px" : "88px"
      }}>
        <div style={styles.logoArea}>
          <div style={styles.logoCircle}>M</div>
          {isSidebarOpen && <h2 style={styles.logoText}>مدير المبيعات</h2>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.toggleBtn}>
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        <nav style={styles.nav}>
          <div style={styles.navGroup}>
            <p style={isSidebarOpen ? styles.groupLabel : styles.hidden}>الرئيسية</p>
            <NavButton id="overview" icon="📊" label="الإحصائيات" active={activeSection} isOpen={isSidebarOpen} onClick={setActiveSection} />
            <NavButton id="inventory" icon="📦" label="المخزون" active={activeSection} isOpen={isSidebarOpen} onClick={setActiveSection} />
          </div>

          <div style={styles.navGroup}>
            <p style={isSidebarOpen ? styles.groupLabel : styles.hidden}>الإدارة المالية</p>
            <NavButton id="expenses" icon="🧾" label="المصاريف" active={activeSection} isOpen={isSidebarOpen} onClick={setActiveSection} />
            <NavButton id="reports" icon="💰" label="التقارير" active={activeSection} isOpen={isSidebarOpen} onClick={setActiveSection} />
          </div>

          <div style={styles.navGroup}>
            <p style={isSidebarOpen ? styles.groupLabel : styles.hidden}>الموارد البشرية</p>
            <NavButton id="staff" icon="👥" label="الموظفين" active={activeSection} isOpen={isSidebarOpen} onClick={setActiveSection} />
            <NavButton id="damaged" icon="🗑️" label="التوالف" active={activeSection} isOpen={isSidebarOpen} onClick={setActiveSection} />
          </div>

          <button onClick={handleLogout} style={styles.logoutBtn}>
            <span style={{ fontSize: "20px" }}>🚪</span>
            {isSidebarOpen && <span style={{ marginRight: "12px" }}>خروج آمن</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        <header style={styles.topHeader}>
          <div style={styles.headerInfo}>
            <h3 style={styles.sectionTitle}>{getSectionTitle(activeSection)}</h3>
            <p style={styles.breadcrumb}>الرئيسية / {getSectionTitle(activeSection)}</p>
          </div>
          
          <div style={styles.adminProfile}>
            <div style={styles.profileText}>
              <span style={styles.adminRole}>مدير النظام</span>
            </div>
            <div style={styles.avatar}>M</div>
          </div>
        </header>

        <div style={styles.contentBody}>
          <div style={styles.contentWrapper}>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

const NavButton = ({ id, icon, label, active, isOpen, onClick }) => (
  <button
    onClick={() => onClick(id)}
    style={active === id ? styles.navBtnActive : styles.navBtn}
    title={!isOpen ? label : ""}
  >
    <span style={styles.navIcon}>{icon}</span>
    {isOpen && <span style={styles.navLabelText}>{label}</span>}
    {active === id && isOpen && <div style={styles.activeDot} />}
  </button>
);

const OverviewStats = () => {
  const [stats, setStats] = useState({ daily_profits: 0, low_stock_count: 0, total_debts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard/stats").then(res => setStats(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={styles.loader}>جاري مزامنة البيانات...</div>;

  return (
    <div style={styles.statsGrid}>
      <StatCard title="أرباح اليوم" value={stats.daily_profits} color="#0ea5e9" icon="📈" unit="ر.س" />
      <StatCard title="نواقص المخزون" value={stats.low_stock_count} color="#f43f5e" icon="⚠️" unit="منتج" />
      <StatCard title="إجمالي المديونية" value={stats.total_debts} color="#f59e0b" icon="💳" unit="ر.س" />
    </div>
  );
};

const StatCard = ({ title, value, color, icon, unit }) => (
  <div style={styles.statCard}>
    <div style={{ ...styles.iconCircle, backgroundColor: `${color}15`, color: color }}>{icon}</div>
    <div style={styles.statInfo}>
      <h4 style={styles.statTitle}>{title}</h4>
      <div style={styles.statValueContainer}>
        <span style={styles.statValue}>{value.toLocaleString()}</span>
        <span style={styles.statUnit}>{unit}</span>
      </div>
    </div>
  </div>
);

// --- Modern Design Tokens (Styles) ---
const styles = {
  dashboardContainer: {
    display: "flex",
    height: "100vh",
    direction: "rtl",
    backgroundColor: "#f4f7fe", // لون خلفية هادئ واحترافي
    fontFamily: "'Inter', sans-serif",
  },
  sidebar: {
    backgroundColor: "#0b1120",
    color: "#94a3b8",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "10px 0 30px rgba(0,0,0,0.05)",
    zIndex: 100,
  },
  logoArea: {
    padding: "30px 24px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    borderBottom: "1px solid #1e293b",
    marginBottom: "10px",
  },
  logoCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "22px",
  },
  logoText: { fontSize: "1.1rem", color: "white", fontWeight: "700", whiteSpace: "nowrap" },
  toggleBtn: {
    marginRight: "auto",
    background: "#1e293b",
    border: "none",
    color: "white",
    borderRadius: "8px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  nav: { padding: "12px", flex: 1, display: "flex", flexDirection: "column", gap: "25px" },
  navGroup: { display: "flex", flexDirection: "column", gap: "4px" },
  groupLabel: { fontSize: "11px", fontWeight: "700", color: "#475569", paddingRight: "15px", marginBottom: "8px", textTransform: "uppercase" },
  navBtn: {
    display: "flex", alignItems: "center", padding: "12px 16px", backgroundColor: "transparent",
    color: "#94a3b8", border: "none", borderRadius: "12px", cursor: "pointer", transition: "0.2s",
  },
  navBtnActive: {
    display: "flex", alignItems: "center", padding: "12px 16px", backgroundColor: "#0ea5e9",
    color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "600",
    boxShadow: "0 10px 15px -3px rgba(14, 165, 233, 0.3)",
  },
  navIcon: { fontSize: "20px", marginLeft: "12px" },
  navLabelText: { fontSize: "15px", flex: 1, textAlign: "right" },
  activeDot: { width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "white" },

  mainContent: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  topHeader: {
    height: "90px", backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)",
    display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px",
    borderBottom: "1px solid #e2e8f0", zIndex: 50
  },
  sectionTitle: { fontSize: "1.4rem", fontWeight: "800", color: "#1e293b", margin: 0 },
  breadcrumb: { fontSize: "12px", color: "#94a3b8", marginTop: "4px" },
  
  adminProfile: { display: "flex", alignItems: "center", gap: "15px" },
  profileText: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  adminName: { fontSize: "15px", fontWeight: "700", color: "#1e293b" },
  adminRole: { fontSize: "11px", color: "#0ea5e9", fontWeight: "600" },
  avatar: { 
    width: "48px", height: "48px", borderRadius: "14px", backgroundColor: "#e2e8f0",
    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold",
    color: "#64748b", border: "2px solid white", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
  },

  contentBody: { padding: "30px 40px", overflowY: "auto", flex: 1 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" },
  statCard: {
    backgroundColor: "white", padding: "24px", borderRadius: "24px",
    display: "flex", alignItems: "center", gap: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #f1f5f9",
  },
  iconCircle: { width: "60px", height: "60px", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" },
  statTitle: { fontSize: "14px", color: "#64748b", fontWeight: "600", marginBottom: "8px" },
  statValue: { fontSize: "26px", fontWeight: "800", color: "#1e293b" },
  statUnit: { fontSize: "12px", color: "#94a3b8", marginRight: "5px" },

  logoutBtn: {
    marginTop: "auto", display: "flex", alignItems: "center", padding: "16px",
    backgroundColor: "rgba(244, 63, 94, 0.1)", color: "#f43f5e", border: "none",
    borderRadius: "16px", cursor: "pointer", fontWeight: "700", marginBottom: "20px"
  },
  loader: { textAlign: "center", padding: "50px", color: "#0ea5e9", fontWeight: "bold" },
  hidden: { display: "none" }
};

const getSectionTitle = (id) => {
  const titles = { overview: "نظرة عامة", inventory: "المخزون والمنتجات", staff: "إدارة الموارد", damaged: "سجل التوالف", expenses: "المصاريف", reports: "التقارير المالية" };
  return titles[id] || "الرئيسية";
};

// مكونات مؤقتة
const DamagedItems = () => <div style={styles.statCard}>📦 سجل التوالف قيد التطوير...</div>;
const ExpensesManager = () => <div style={styles.statCard}>💸 إدارة المصاريف قيد التطوير...</div>;
const ReportsSection = () => <div style={styles.statCard}>📈 التقارير المالية قيد التطوير...</div>;

export default AdminDashboard;