import QRCode from 'qrcode';

//************************* SHARE PROFILE ********************** */

const shareProfile = async (req, res, next) => {
  //put url of add message here
  QRCode.toDataURL('http://localhost:7000/message', (err, qr) => {
    res.send(`<img src='${qr}'/>`);
  });
};

//************************* ADD MESSAGE ********************** */

export { shareProfile };
