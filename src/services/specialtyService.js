const db = require("../models");

let createSpecialty =(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
                resolve({
                errCode:1,
                errMessage:'Missing paremeter'
                })
            }else{
                await db.Specialty.create({
                    name:data.name,
                    image: data.imageBase64,
                    descriptionHTML:data.descriptionHTML,
                    descriptionMarkdown:data.descriptionMarkdown
                })
                resolve({
                    errCode:0,
                    errMessage:'Tao Moi Thanh cong'
                })
            }
        }catch(e){
            reject(e);
        }
    })
}
let getAllSpecialty = ()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let data = await db.Specialty.findAll();
            if(data && data.length >0){
                data.map(item =>{
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })       
            }
            resolve({
                errCode:0,
                errMessage:'OK',
                data
            })

        }catch(e){
            reject(e);
        }
       
    })
}
let deleteSpecialty = (SpecialtyId)=>{
    return new Promise(async(resolve, reject)=>{
        let foundSpecialty= await db.Specialty.findOne({
            where: {id: SpecialtyId}
        })
        if(!foundSpecialty){
            resolve({
                errCode:2,
                errMessage:'The user isnt exsit'
            })
        }
      
        await db.Specialty.destroy({
            where: {id: SpecialtyId}
        })
      
        resolve({
            errCode:0,
            message:'The user is deleted'
        })
    })
}
module.exports={
    createSpecialty:createSpecialty,
    getAllSpecialty:getAllSpecialty,
    deleteSpecialty:deleteSpecialty
}