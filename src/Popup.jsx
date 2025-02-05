// import { useEffect, useState } from "react";
// import BlockedPage from "./BlockedPage";

// export default function Popup() {
//   const [url, setUrl] = useState(""); // Current URL
//   const [status, setStatus] = useState("Loading..."); // Safe/Malicious status
//   const [isBlocked, setIsBlocked] = useState(false); // Track blocked status

//   useEffect(() => {
//     // Always check for new active tab URL
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const activeTab = tabs[0];

//       if (activeTab?.url) {
//         if (
//           activeTab.url.startsWith("chrome://") ||
//           activeTab.url.startsWith("chrome-extension://")
//         ) {
//           return; // Do NOT update if on a Chrome internal page
//         }

//         // **NEW: Reset blocked site before checking new one**
//         chrome.storage.local.remove("blockedUrl");

//         setUrl(activeTab.url);

//         // Fetch the website's safety status
//         fetch("https://safeclick.onrender.com/check", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ url: activeTab.url }),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.phishing_result === "Malicious") {
//               setStatus("⚠️ Malicious");
//               setIsBlocked(true);

//               // **Store new blocked site**
//               chrome.storage.local.set({ blockedUrl: activeTab.url });
//             } else {
//               setStatus("✅ Safe");
//               setIsBlocked(false);
//             }
//           })
//           .catch((error) => {
//             console.error("Error checking website:", error.message);
//             setStatus("Error checking website.");
//           });
//       }
//     });
//   }, []);

//   // **Keep showing BlockedPage if the site is blocked**
//   if (isBlocked) {
//     return <BlockedPage url={url} />;
//   }

//   return (
//     <div
//       style={{
//         padding: "20px",
//         width: "350px",
//         fontFamily: "'Roboto', sans-serif",
//         textAlign: "center",
//         borderRadius: "25px",
//         backdropFilter: "blur(20px)",
//         background:
//           "linear-gradient(145deg, rgba(10, 10, 10, 0.95), rgba(30, 30, 30, 0.9))",
//         backgroundImage:
//           "url('https://png.pngtree.com/thumb_back/fh260/background/20230416/pngtree-smooth-abstract-curved-red-lines-pattern-image_2413856.jpg')",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         color: "#fff",
//         boxShadow: "0px 20px 50px rgba(255, 0, 0, 0.6)",
//         border: "2px solid rgba(255, 0, 0, 0.3)",
//       }}
//     >
//       <h3
//         style={{
//           fontSize: "24px",
//           color: "#ff4d4d",
//           fontFamily: "'Pacifico', cursive",
//         }}
//       >
//         SafeLink Extension
//       </h3>

//       <p style={{ fontSize: "16px", color: "#ddd", marginBottom: "8px" }}>
//         <strong>Current URL:</strong>
//       </p>
//       <p
//         style={{
//           padding: "12px",
//           background: "rgba(30, 30, 30, 0.8)",
//           color: "#ccc",
//           borderRadius: "8px",
//           wordBreak: "break-word",
//         }}
//       >
//         {url || "Loading..."}
//       </p>

//       <p
//         style={{
//           marginTop: "20px",
//           fontSize: "18px",
//           fontWeight: "bold",
//           color: status === "⚠️ Malicious" ? "#ff4d4d" : "#4dff4d",
//         }}
//       >
//         Status: {status}
//       </p>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import BlockedPage from "./BlockedPage";

export default function Popup() {
  const [url, setUrl] = useState(""); // Current URL
  const [status, setStatus] = useState("Loading..."); // Safe/Malicious status
  const [isBlocked, setIsBlocked] = useState(false); // Track blocked status

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (activeTab?.url) {
        if (
          activeTab.url.startsWith("chrome://") ||
          activeTab.url.startsWith("chrome-extension://")
        ) {
          return; // Do NOT update if on a Chrome internal page
        }

        chrome.storage.local.remove("blockedUrl");

        setUrl(activeTab.url);

        // Fetch the website's safety status
        fetch("https://safeclick.onrender.com/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: activeTab.url }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.phishing_result === "Malicious") {
              setStatus("⚠️ Malicious");
              setIsBlocked(true);

              chrome.storage.local.set({ blockedUrl: activeTab.url });
            } else {
              setStatus("✅ Safe");
              setIsBlocked(false);
            }
          })
          .catch((error) => {
            console.error("Error checking website:", error.message);
            setStatus("Error checking website.");
          });
      }
    });
  }, []);

  // Keep showing BlockedPage if the site is blocked
  if (isBlocked) {
    return <BlockedPage url={url} />;
  }

  return (
    <div
      style={{
        padding: "20px",
        width: "400px",
        fontFamily: "'Roboto', sans-serif",
        textAlign: "center",
        borderRadius: "25px",
        color: "#fff",
        position: "relative", // Required for proper content placement
        height: "400px",
        border: "2px solid rgba(255, 0, 0, 0.6)",
        background: "black",
        boxShadow: "0px 0px 20px rgba(255, 0, 0, 0.7)",
        overflow: "hidden", // Ensure background stays inside
        backgroundImage: `url('https://media.gettyimages.com/id/600107258/video/4k-red-wave-transition.jpg?s=640x640&k=20&c=1qfaKUDBZmcM_tok0XxBpnDWiszjBvzOiWh04p0h6jI=')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            color: "#ff4d4d",
            textShadow: "0px 0px 8px rgba(255, 0, 0, 0.9)",
            marginBottom: "20px",
          }}
        >
          SafeLink Extension
        </h3>

        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            background: "rgba(30, 30, 30, 0.8)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 0, 0, 0.4)",
            boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.3)",
          }}
        >
          <p style={{ fontSize: "16px", color: "#ddd", marginBottom: "8px" }}>
            <strong>Current URL:</strong>
          </p>
          <p
            style={{
              padding: "10px",
              background: "rgba(50, 50, 50, 0.8)",
              color: "#ccc",
              borderRadius: "8px",
              border: "1px solid rgba(255, 0, 0, 0.2)",
              wordBreak: "break-word",
            }}
          >
            {url || "Loading..."}
          </p>
        </div>

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: status === "⚠️ Malicious" ? "#ff4d4d" : "#4dff4d",
            textShadow:
              status === "⚠️ Malicious"
                ? "0px 0px 10px rgba(255, 0, 0, 0.7)"
                : "0px 0px 10px rgba(77, 255, 77, 0.7)",
          }}
        >
          Status: {status}
        </p>

        {/* Dashboard Button */}
        <button
          onClick={() =>
            chrome.tabs.create({
              url: chrome.runtime.getURL("dashboard.html"),
            })
          }
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            background: "#ff4d4d",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.3)",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#ff1a1a";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#ff4d4d";
          }}
        >
          Visit Dashboard
        </button>
      </div>
    </div>
  );
}
