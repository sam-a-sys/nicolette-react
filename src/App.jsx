import { useState, useEffect } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#6b21a8",
    padding: "40px 16px",
    fontFamily: "sans-serif",
  },
  banner: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  subtext: {
    color: "#e9d5ff",
    fontSize: "12px",
    marginBottom: "24px",
  },
  container: {
    width: 350,
    height: 630,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    background: "#000",
    color: "#fff",
    padding: 12,
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    paddingRight: 40,
  },
  refreshBtn: {
    position: "absolute",
    right: 12,
    background: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    padding: "4px 8px",
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    cursor: "pointer",
    borderRadius: 4,
  },
  tabBar: {
    display: "flex",
    background: "#fff",
    borderBottom: "1px solid #eee",
  },
  tabBtn: (active) => ({
    flex: 1,
    padding: "12px 2px",
    border: "none",
    background: "none",
    fontSize: 10,
    fontWeight: "bold",
    color: active ? "#000" : "#999",
    textTransform: "uppercase",
    cursor: "pointer",
    borderBottom: active ? "2px solid #000" : "2px solid transparent",
  }),
  content: {
    flex: 1,
    background: "#fff",
    overflow: "hidden",
  },
  hero: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
    display: "block",
  },
};

export default function NicoletteReact() {
  const [activeTab, setActiveTab] = useState("f");
  const [refreshKey, setRefreshKey] = useState(0);

  const tabs = [
    { id: "f", label: "1.WF Choice" },
    { id: "v", label: "2.Job Seeker Buffer" },
    { id: "a", label: "3.Output Data" },
    { id: "p", label: "4.WF Run Log" },
  ];

  const iframeSrc = {
    v: "https://cs-crossproject-test.preview.softr.app/nicolette-v2-question-buffer-pub?show-toolbar=true",
    a: "https://cs-crossproject-test.preview.softr.app/nicolette-v2-jobseeker-lastrun-result-pub?autoUser=true&show-toolbar=true",
    p: "https://cs-crossproject-test.preview.softr.app/nicolette-v2-jobseeker-run-log-pub?autoUser=true&show-toolbar=true&device=mobile",
  };

  // Load the Fillout embed script once, when tab "f" is shown
  useEffect(() => {
    if (activeTab === "f" && !document.getElementById("fillout-script")) {
      const script = document.createElement("script");
      script.id = "fillout-script";
      script.src = "https://server.fillout.com/embed/v1/";
      document.body.appendChild(script);
    }
  }, [activeTab]);

  const refreshAll = () => setRefreshKey((k) => k + 1);

  return (
    <div style={styles.page}>
      <div style={styles.banner}>⚛ REACT VERSION</div>
      <div style={styles.subtext}>Same widget, rebuilt as a React component</div>

      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.headerTitle}>Nicolette Almeida, reporting for duty, in high heels</span>
          <button style={styles.refreshBtn} onClick={refreshAll}>↻ Refresh</button>
        </div>

        <div style={styles.tabBar}>
          {tabs.map((t) => (
            <button
              key={t.id}
              style={styles.tabBtn(activeTab === t.id)}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={styles.content}>
          {activeTab === "f" && (
            <div style={styles.hero}>
              <div
                data-fillout-id="1jHT5qfyL3us"
                data-fillout-embed-type="popup"
                data-fillout-button-text="Nicolette is longing for your touch V2"
                data-fillout-dynamic-resize
                data-fillout-button-color="#B69099"
                data-fillout-button-size="medium"
                data-fillout-inherit-parameters
                data-fillout-popup-size="medium"
              />
            </div>
          )}
          {activeTab !== "f" && (
            <div style={styles.hero}>
              <iframe
                key={activeTab + refreshKey}
                src={iframeSrc[activeTab]}
                style={styles.iframe}
                title={activeTab}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
