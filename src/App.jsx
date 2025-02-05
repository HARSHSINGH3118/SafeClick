export default function App() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    chrome.storage.local.get("currentUrl", (data) => {
      setUrl(data.currentUrl || "Unknown");
    });
  }, []);

  return (
    <div style={{ padding: "16px", color: "#fff", backgroundColor: "#333" }}>
      <h1>SafeLink Extension</h1>
      <p>Current URL: {url}</p>
    </div>
  );
}
