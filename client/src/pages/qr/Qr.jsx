import React, { useState } from "react";
import axios from "axios";
import './Qr.css'

const QRGenerator = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [qrCode, setQrCode] = useState("");
const downloadQr = ()=>{
    console.log("object22")
    try {
        const qrImage = document.getElementById("qr-img"); // Get the QR code image element
        if (!qrImage) return;
        const imageUrl = qrImage.src; // Get the image URL
        const link = document.createElement("a"); // Create a download link
        const time = new Date() ;
         
        link.href = imageUrl;
        link.download = "qrcode"+Date.now()+".png"; // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    } catch (error) {
        console.log(error)
    }
  }
    const generateQR = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/qr/generate", { text:originalUrl });
            setQrCode(response.data.qrCode);
        } catch (error) {
            console.error("Error generating QR:", error);
        }
    };

    return (
        // <div>
        //     <h3>QR Code Generator</h3>
        //     <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
        //     <button onClick={generateQR}>Generate QR</button>
        //     {qrCode && <img src={qrCode} alt="Generated QR Code" />}
        // </div>
        <>
        {" "}
        <h1 className="heading2">
        QR Code Generator
        </h1>
       <h3 style={{ textAlign: "left" }}>Paste the link here</h3>
      <div className="resultt">
      <input
        className="inputlink"
        type="text"
        placeholder="Enter long URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
        <button className="butn" onClick={generateQR}>
          Generate
        </button>
       </div>
          {qrCode &&<div style={{display:"flex" , flexDirection:"column" ,justifyContent:"center" , alignItems:"center"}}>
            <img id="qr-img" className="qrimg" src={qrCode} alt="Generated QR Code" />
            <button className="download" onClick={downloadQr} >Download</button>
            </div>
           }
      </>
    );
};

export default QRGenerator;
