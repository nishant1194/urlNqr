import React, { useState,useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

function QrScanner() {
  const [scanResult, setScanResult] = useState("");
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
     scanner.render(
      async (decodedText) => {
        setScanResult(decodedText);
        scanner.clear();
        
        if (decodedText.startsWith("http")) {
          window.open(decodedText, "_blank");
        }
      },
      (errorMessage) => {
        console.log("QR Scan Error:", errorMessage);
      }
    );
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Google Lens-like QR Scanner</h2>

      <div id="reader"></div>
      
      <h3>Scanned Data:</h3>
      <p>{scanResult}</p>
    </div>
  );
}

export default QrScanner;
