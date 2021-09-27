const controller_object = {};
const uuid = require('uuid');
const { pool } = require('../config/config');
const response = require('../utils/response');
const { avgRating } = require('../utils/ratingCount');

controller_object.getAllWisata = async(req, res, next) => {
    pool.query(`SELECT * FROM public.wisata`, (err, results) => {
        if (err) throw err;
        response.responseSuccess(res, results.rows);
        return;
    })
};

controller_object.getWisataById = async(req, res, next) => {
    const id = req.params.id;

    pool.query(`SELECT public.wisata.name FROM public.wisata WHERE id = $1`, [id], (err, results) => {
        const data = results.rows;
        
        if (err) throw err;
        if (!results.rows.length) {
            return res.status(404).json({
                code: 404,
                status: "Data Not Found",
            })
        }
        else {
            pool.query(`SELECT public.review.id, public.users.name AS username, public.users.images AS users_photo, public.review.calender, public.review.rating, public.review.review, public.review.images FROM public.wisata LEFT JOIN public.review ON public.wisata.id = public.review.id_wisata LEFT JOIN public.users ON public.review.id_users = public.users.id WHERE public.wisata.id = $1`, [id], (err, results) => {
                if (err) throw err;

                const ratingAvg = avgRating(results.rows);

                return res.status(200).json({
                    tempat_wisata: data[0].name,
                    ratingAvg,
                    review: results.rows
                });
            });
        }
    })
};

controller_object.createWisata = async(req, res, next) => {
    const { name } = req.body;

    pool.query(`SELECT * FROM public.wisata WHERE name = $1`, [name], (err, results) => {
        if (err) throw err;
        if (results.rows.length > 0) {
            response.responseFailed(res, "Wisata sudah didaftarkan");
            return;
        }
        else {
            pool.query(`INSERT INTO public.wisata (id, name) VALUES ($1, $2)`, [uuid.v4(), name], (err, results) => {
                if (err) throw err;
                response.responseSuccess(res, "Wisata sukses didaftarkan");
                return;
            })
        }
    })
};

controller_object.editWisata = async(req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;

    pool.query(`SELECT * FROM public.wisata WHERE name = $1`, [name], (err, results) => {
        if (err) throw err;
        if (!results.rows.length) {
            return res.status(404).json({
                code: 404,
                status: "Data Not Found",
            })
        }
        if (results.rows.length > 0) {
            response.responseFailed(res, "Wisata sudah didaftarkan");
            return;
        }
        else {
            pool.query('UPDATE public.wisata SET name = $1 WHERE id = $2', [name, id], (err, result) => {
                if (err) throw err
                response.responseSuccess(res, "Wisata sukses diperbarui");
                return;
            });
        }
    })
};

controller_object.deleteWisata = async(req, res, next) => {
    const id = req.params.id;

    pool.query(`SELECT * FROM public.wisata WHERE id = $1`, [id], (err, results) => {
        if (err) throw err;
        if (!results.rows.length) {
            return res.status(404).json({
                code: 404,
                status: "Data Not Found",
            })
        }
        else {
            pool.query(`DELETE FROM public.wisata WHERE id = $1`, [id], (err, results) => {
                if (err) throw err;
                response.responseSuccess(res, "Wisata sukses dihapus");
                return;
            })
        }
    })
};

module.exports = controller_object;