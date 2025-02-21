import React, { useState } from "react";
import axios from "axios";
import QRGenerator from "../qr/Qr";
import UrlShortner from "../../Components/urlShortner/UrlShortner";
import Navbar from "../../Components/navbar/Navbar";
import './Home.css'
import Footer from "../../Components/footer/Footer";
import QrScanner from "../../Components/qrScanner/QrScanner";
const App = () => {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied!");
  };
  const [activeState, setActiveState] = useState("shortlink");
  // 
  const [originalUrl, setOriginalUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
  if(customUrl.trim() === ""){
    const res = await axios.post("http://localhost:8000/api/url/shorten", { originalUrl, customUrl});
    setShortUrl(res.data.shortUrl);
  }else{
    const res = await axios.post("http://localhost:8000/api/url/custom-shorten", { originalUrl, customUrl});
    setShortUrl(res.data.shortUrl);
  }
  };

  return (
    // <div>
    //   <h1>URL Shortener</h1>
    //   <input
    //     type="text"
    //     placeholder="Enter URL"
    //     value={originalUrl}
    //     onChange={(e) => setOriginalUrl(e.target.value)}
    //   />
    //    <input
    //     type="text"
    //     placeholder="Enter custom url"
    //     value={customUrl}
    //     onChange={(e) => setCustomUrl(e.target.value)}
    //   />
    //   <button onClick={handleShorten}>Shorten</button>
    //   {shortUrl && (
    //     <p>Shortened URL: <a href={`http://localhost:5173/${shortUrl}`} target="_blank" rel="noopener noreferrer">http://localhost:5173/{shortUrl}</a></p>
    //   )}
    // </div>
    <>
    <Navbar />
    <div className="container">
      <h1 className="heading1">Free Link Shortner</h1>
      <p className="subheading">
        Use our URL shortener, QR Code Generator.
      </p>

      <div className="card">
      <div className="card-inner">
        <div
          className={
            activeState === "shortlink" ? "pressedbtn" : "nonpressedbtn"
          }
          onClick={() => {
            setActiveState("shortlink");
          }}
        >
      
          Short Url
        </div> 
        <div
          className={
            activeState === "qrcode" ? "pressedbtn" : "nonpressedbtn"
          }
          onClick={() => {
            setActiveState("qrcode");
          }}
        >
          QR Code
        </div>
        <div
          className={
            activeState === "qrscan" ? "pressedbtn" : "nonpressedbtn"
          }
          onClick={() => {
            setActiveState("qrscan");
          }}
        >
          QR Scan
        </div>
      </div>
      { activeState === "shortlink" ? <UrlShortner /> : <></>}
      { activeState === "qrscan" ? <QrScanner /> : <></>}

      { activeState === "qrcode" ? <QRGenerator /> : <></>}


     
      </div>
    </div>
    <Footer />
    </>
    // <QRGenerator />
  );
};

export default App;
