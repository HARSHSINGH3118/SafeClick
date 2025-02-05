chrome.runtime.onInstalled.addListener(() => {
  console.log("SafeLink Extension installed and running.");

  // Optional: Add a predefined list of malicious URLs dynamically
  const predefinedMaliciousUrls = [
    "*://*.example-malicious.com/*",
    "*://*.another-bad-site.com/*",
  ];

  const dynamicRules = predefinedMaliciousUrls.map((url, index) => ({
    id: 1000 + index, // Unique rule ID
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        url: chrome.runtime.getURL("contact.html"), // Redirect to contact.html
      },
    },
    condition: {
      urlFilter: url,
      resourceTypes: ["main_frame"],
    },
  }));

  // Update dynamic rules
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: dynamicRules,
      removeRuleIds: dynamicRules.map((rule) => rule.id),
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error adding dynamic rules:",
          chrome.runtime.lastError.message
        );
      } else {
        console.log("Dynamic rules added for predefined malicious URLs.");
      }
    }
  );
});

// Function to dynamically block a URL based on API response
function blockMaliciousUrl(url) {
  const dynamicRuleId = 2001; // Unique ID for this rule
  const rule = {
    id: dynamicRuleId,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        url: chrome.runtime.getURL("contact.html"),
      },
    },
    condition: {
      urlFilter: url,
      resourceTypes: ["main_frame"],
    },
  };

  // Add dynamic rule
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: [rule],
      removeRuleIds: [dynamicRuleId],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error adding dynamic rule:",
          chrome.runtime.lastError.message
        );
      } else {
        console.log(`Rule dynamically added to block: ${url}`);
      }
    }
  );
}

// Example: Listening for API responses to add dynamic rules
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkUrl" && message.url) {
    // Simulate API call or handle the URL dynamically
    fetch("https://safeclick.onrender.com/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: message.url }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.phishing_result === "Malicious") {
          console.log(`Dynamically blocking URL: ${message.url}`);
          blockMaliciousUrl(message.url);
          sendResponse({ result: "blocked" });
        } else {
          console.log(`URL is safe: ${message.url}`);
          sendResponse({ result: "safe" });
        }
      })
      .catch((error) => {
        console.error("Error checking URL:", error.message);
        sendResponse({ result: "error" });
      });

    // Return true to indicate asynchronous response
    return true;
  }
});
