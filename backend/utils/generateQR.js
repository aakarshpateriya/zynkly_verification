const QRCode = require("qrcode");

const generateQR = async (cleanerId) => {
  const url = `http://localhost:3000/verify/${cleanerId}`;

  await QRCode.toFile(`./qrcodes/${cleanerId}.png`, url);
  console.log("QR Generated for:", cleanerId);
};

generateQR("ZYNK1001");