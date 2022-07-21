import clinicService from "../services/clinicService";

let createClinic = async(req, res)=>{
    try{
        let infor = await clinicService.createClinic(req.body); //query khi url ?id ->get , body khi khong co url->posy
        return res.status(200).json(infor)

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports={
    createClinic:createClinic,
}