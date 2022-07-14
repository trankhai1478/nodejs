require('dotenv').config();
import nodemailer from 'nodemailer';
let sendSimpleEmail = async(dataSend)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Kkhai Tran 👻" <trankhai1478@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
       
        html: getBodyHTMLEmail(dataSend),
      });
}
let getBodyHTMLEmail = (dataSend)=>{
  let result =''
  if(dataSend.language === 'vi'){
    result = 
    `
        <h3>Xin chào  ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Trần Quốc Khải</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><p>Thời gian: ${dataSend.time}</p></div>
        <div><p>Bác sĩ: ${dataSend.doctorName}</p></div>
        <p>Nếu các thông tin trên là đúng sự thật, vui lòng chọn vào đương link liên kết ở dưới 
        để xác nhận hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
        <a href="${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Xin chân thành cảm ơn. </div>
     `
      }

  if(dataSend.language === 'en'){
    result =
    `
        <h3>Dear  ${dataSend.patientName}</h3>
        <p>You received this email because you booked an online medical appointment on Tran Quoc Khai</p>
        <p>Information to book a medical appointment:</p>
        <div><p>Time: ${dataSend.time}</p></div>
        <div><p>Doctor: ${dataSend.doctorName}</p></div>
        <p>If the above information is true, please click on the link below to confirm completion of the medical
         appointment booking procedure.</p>
        <div>
        <a href="${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Sincerely thank. </div>
    `
  }
  return result;
}

module.exports = {
    sendSimpleEmail:sendSimpleEmail
}