const controller_object = {};
const { pool } = require('../config/config');
const commonUtils = require('../utils/commonUtils');
const fileUtils = require('../utils/fileUtils');
const uuid = require('uuid');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const { deleteFile } = require('../utils/fileUtils');

controller_object.createReview = async(req, res, next) => {
    const id_wisata = req.params.id;
    const { rating, review } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
    const id_users = tokenData.id;

    const images = req.files;
    const data = images.map((file) => file.filename)
    let ip = await commonUtils.getPublicIp();
    const result = data.map((photo) =>
        fileUtils.buildFileAddress(ip, photo)
    );

    pool.query(`INSERT INTO public.review (id, id_wisata, id_users, calender, rating, review, images) VALUES ($1, $2, $3, now(), $4, $5, $6)`, [uuid.v4(), id_wisata, id_users, rating, review, result], (err, results) => {
        if (err) throw err;
        response.responseSuccess(res, "Review sukses di post");
        return;
    })
};

controller_object.getReviewById = async(req, res, next) => {
    const id = req.params.idReview;

    pool.query(`SELECT * FROM public.review WHERE id = $1`, [id], (err, results) => {
        if (err) throw err;
        if (!results.rows.length) {
            return res.status(404).json({
                code: 404,
                status: "Data Not Found",
            })
        }
        else {
            response.responseSuccess(res, results.rows);
            return;
        }
    })
};

controller_object.editReview = async(req, res, next) => {
    const id = req.params.idReview;
    const { rating, review } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
    const id_users = tokenData.id;

    const images = req.files;
    
    const data = images.map((file) => file.filename)
    let ip = await commonUtils.getPublicIp();
    const result = data.map((photo) =>
        fileUtils.buildFileAddress(ip, photo)
    );

    pool.query(`SELECT * FROM public.review WHERE id = $1`, [id], (err, results) => {
        if (err) throw err;
        if(!results.rows.length) {
            return res.status(404).json({
                code: 404,
                status: "Data Not Found",
            })
        }
        if (results.rows[0].id_users != id_users) {
            response.responseForbidden(res, "Unauthorized");
            return;
        }
        else {
            pool.query(`UPDATE public.review SET rating = $1, review = $2, images = $3 WHERE id = $4`, [rating, review, result, id], (err, results) => {
                if (err) throw err;
                response.responseSuccess(res, "Review sukses di update");
                return;
            })
        }
    })
};

controller_object.deleteReview = async(req, res, next) => {
    const id = req.params.idReview;
    const token = req.headers.authorization.split(' ')[1];
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
    const id_users = tokenData.id;

    pool.query(`SELECT * FROM public.review WHERE id = $1`, [id], (err, results) => {
        if (err) throw err;
        if(!results.rows.length) {
            return res.status(404).json({
                code: 404,
                status: "Data Not Found",
            })
        }
        if (results.rows[0].id_users != id_users) {
            response.responseForbidden(res, "Unauthorized");
            return;
        }
        else {
            pool.query(`SELECT public.review.images FROM public.review WHERE id = $1`, [id], (err, results) => {
                if (err) throw err;
                for (var i = 0; i < results.rows[0].images.length; i++) {
                    deleteFile(results.rows[0].images[i]);
                }
                pool.query(`DELETE FROM public.review WHERE id = $1`, [id], (err, results) => {
                    if (err) throw err;
                    response.responseSuccess(res, "Review sukses dihapus");
                    return;
                })
            })
        }
    })


};

module.exports = controller_object;