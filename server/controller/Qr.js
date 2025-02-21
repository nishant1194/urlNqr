import qr from "qr-image";
 
export const generateQR = (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    const qrImage = qr.imageSync(text, { type: "png" });
    const qrBase64 = `data:image/png;base64,${qrImage.toString("base64")}`;
    
    res.json({ qrCode: qrBase64 });
};
