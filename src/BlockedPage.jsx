import React, { useEffect } from "react";

const BlockedPage = ({ url }) => {
  useEffect(() => {
    // Automatically open contact.html in the current Chrome tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.tabs.update(activeTab.id, {
          url: chrome.runtime.getURL("contact.html"),
        });
      }
    });
  }, []);

  const handleContactClick = () => {
    // Open contact.html in the current Chrome tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.tabs.update(activeTab.id, {
          url: chrome.runtime.getURL("contact.html"),
        });
      }
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        width: "350px",
        fontFamily: "'Roboto', sans-serif",
        textAlign: "center",
        borderRadius: "25px",
        background: "#ff4d4d",
        color: "#fff",
        boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.6)",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        🚫 Website Blocked
      </h1>
      <p
        style={{
          fontSize: "16px",
          wordBreak: "break-word",
          marginBottom: "20px",
        }}
      >
        The website <strong>{url}</strong> has been flagged as malicious and has
        been blocked.
      </p>
      <p style={{ fontSize: "14px", marginBottom: "15px" }}>
        If you think this is an error, please contact the admin.
      </p>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#ff4d4d",
          background: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)",
        }}
        onClick={handleContactClick} // This is still here in case needed manually
      >
        Contact Support
      </button>
    </div>
  );
};

export default BlockedPage;
