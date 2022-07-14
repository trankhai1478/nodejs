import db from "../models/index";
require('dotenv').config();
import emailService from './emailService';

let postBookAppointment = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!data.email || !data.doctorId || !data.timeType || !data.date ||!data.fullName){
                resolve({
                errCode:1,
                errMessage:'Missing paremeter'
                })
            }else{             
                await emailService.sendSimpleEmail({
                    receiverEmail:data.email,
                    patientName: data.fullName,
                    time:data.timeString,
                    doctorName:data.doctorName,
                    language:data.language,
                    redirectLink:'https://www.facebook.com/KhaiTran.TQK'
                })
                //cap nhat benh nhat
                 let user = await db.User.findOrCreate({
                    where: { email: data.email},
                    defaults: {
                      email: data.email,
                      roleId: 'R3'
                    }
                  });
                  if(user && user[0]){
                    await db.Booking.findOrCreate({
                        where:{patientId: user[0].id}, //1 id chi tao 1 lan lich hen, tranh spam
                        defaults:{
                            statusId:'S1', // tu dong them voi trang thai la s1
                            doctorId:data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                      
                    })
                  }
                  resolve({
                    
                    errCode:0,
                    errMessage:'Save infor patient Succeed'
                  })
            }
           
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    postBookAppointment:postBookAppointment
}