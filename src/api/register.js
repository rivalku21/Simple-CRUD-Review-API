const controller_object = {};
const bcrypt = require('bcrypt');
const { pool } = require("../config/config");
const uuid = require('uuid');
const response = require("../utils/response");
const commonUtils = require('../utils/commonUtils');
const fileUtils = require('../utils/fileUtils');

controller_object.register = async(req,res,next) => {
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const file = req.file;
    
    let ip = await commonUtils.getPublicIp();
    const photos = fileUtils.buildFileAddress(ip, file.filename);

    if( !name || !username || !password || !file) {
        response.responseFailed(res, "Tolong isi semua form");
        return;
    }

    pool.query(`SELECT * FROM public.users WHERE username = $1`, [username], async(err, results) => {
        if (err) {
            throw err
        }
        if (results.rows.length > 0) {
            response.responseFailed(res, "username sudah digunakan");
            return;
        }
        else {  
            pool.query(`INSERT INTO public.users (id, name, username, password, images, create_at) VALUES ($1, $2, $3, $4, $5, now())`, [uuid.v4(), name, username, hashedPassword, photos], (err, results) => { 
                if (err) { 
                    throw err;
                } 
                response.responseSuccess(res, 'Registrasi sukses');
                return;
            })
        }                
    })
};

module.exports = controller_object;