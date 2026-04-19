const QRCode = require("qrcode");
const generateToken = require("./token");

const generateQR = async (cleanerId) => {
  const token = generateToken(cleanerId);

  const url = `http://localhost:3000/verify/${token}`;

  await QRCode.toFile(`./qrcodes/${cleanerId}.png`, url);

  console.log("Secure QR Generated:", cleanerId);
};

generateQR("ZYNK1001");