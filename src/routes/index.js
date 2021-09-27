const express = require('express');
const router = express.Router();
const fileUtils = require('../utils/fileUtils');
const userMiddleware = require('../middleware/users');

const api = require('../api/api');
const login = require('../api/login');
const register = require('../api/register');
const wisata = require('../api/wisata');
const review = require('../api/review');


router.get('/', api.contoh_fungsi);
router.post('/register', fileUtils.multer.single("photos"), register.register);
router.post('/login', login.login);

router.route('/wisata')
    .get(userMiddleware.isLoggedIn, wisata.getAllWisata)
    .post(userMiddleware.isLoggedIn, wisata.createWisata);
router.route('/wisata/:id')
    .get(userMiddleware.isLoggedIn, wisata.getWisataById)
    .put(userMiddleware.isLoggedIn, wisata.editWisata)
    .delete(userMiddleware.isLoggedIn, wisata.deleteWisata);

router.route('/wisata/:id/review')
    .post(userMiddleware.isLoggedIn, fileUtils.multer.array("images"), review.createReview);
router.route('/review/:idReview')
    .get(userMiddleware.isLoggedIn, review.getReviewById)
    .put(userMiddleware.isLoggedIn, fileUtils.multer.array("images"), review.editReview)
    .delete(userMiddleware.isLoggedIn, review.deleteReview);

module.exports = router;