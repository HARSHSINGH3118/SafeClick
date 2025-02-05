import React from "react";

const ContactPage = () => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "50px auto",
        fontFamily: "'Roboto', sans-serif",
        textAlign: "center",
        borderRadius: "25px",
        background: "#fff",
        color: "#333",
        boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.6)",
        border: "2px solid #ff4d4d",
      }}
    >
      <h1 style={{ fontSize: "24px", color: "#ff4d4d", marginBottom: "20px" }}>
        🚨 Website Not Safe for Browsing
      </h1>
      <p style={{ fontSize: "16px", marginBottom: "20px" }}>
        The website you tried to access has been flagged as unsafe for browsing.
        If you believe this is an error, please contact the administrator for
        further assistance.
      </p>
      <a
        href="mailto:admin@example.com"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          background: "#ff4d4d",
          textDecoration: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Email Admin
      </a>
    </div>
  );
};

export default ContactPage;
