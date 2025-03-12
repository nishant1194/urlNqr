import { useState } from "react";
import "./UrlShortner.css";
import axios from "axios";

function UrlShortner() {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied!");
  };
    const [originalUrl, setOriginalUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    const updatedCustomUrl = customUrl.substring(1) || "";
    setCustomUrl(updatedCustomUrl);
    if (customUrl.trim() === "" || customUrl.trim() === "/") {
      try {
        const res = await axios.post("https://shortly-puce-three.vercel.app/api/url/shorten", {
          originalUrl,
        });
        setShortUrl(res.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          "https://shortly-puce-three.vercel.app/api/url/custom-shorten",
          { originalUrl, customUrl: updatedCustomUrl }
        );
        setShortUrl(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {" "}
      <h1 className="heading2">URL Shortener</h1>
      <h3 style={{ textAlign: "left" }}>Paste the link here</h3>
      <div className="resultt">
        <input
          className="inputlink"
          type="text"
          placeholder="Enter long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button className="butn" onClick={handleShorten}>
          Shorten
        </button>
      </div>
      {customUrl && (
        <>
          <h3 style={{ textAlign: "left" }}>Write custom link</h3>
          <div className="resultt">
            <input
              className="inputlink"
              type="text"
              placeholder="Write custom link"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
          </div>
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
     { !customUrl&&  <span
          className="add"
          onClick={() => {
            setCustomUrl("/");
          }}
        >
          Add custom Link
        </span>}
      </div>
     { shortUrl.message && <p style={{color:"red"}}>
      This url exists. 
      </p>}
      {shortUrl.shortUrl && (
        <>
          <h3 style={{ textAlign: "left", margin: "20px 0px 0px 0px" }}>
            Short Url
          </h3>

          <div className="result">
            <a
              href={`http://localhost:5173/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:5173/{shortUrl}
            </a>{" "}
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        </>
      )}
    </>
  );
}

export default UrlShortner;
