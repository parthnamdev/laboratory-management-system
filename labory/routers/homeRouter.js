const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const upload = require('../middlewares/upload');

router.get('/', homeController.index);
router.get('/addPatient', homeController.addPatientPage);
router.get('/createReport', homeController.createReport);
router.get('/editReport/:uuid', homeController.editReport)
router.get('/manageTest', homeController.manageTest);
router.get('/sendReport', homeController.allReport);
// router.get('/payments', homeController.payments);
router.get('/viewReport/:uuid',homeController.viewReport);
// router.get('/sendReport', homeController.allReport);
router.get('/downloadReport/:uuid', homeController.downloadReport);
router.get('/sendReport/:uuid',homeController.sendReport);
router.get('/deleteReport/:uuid',homeController.deleteReport);
router.get('/profile', homeController.profile);

router.post('/changeRemark/:uuid', homeController.changeRemark);
router.post('/profile', homeController.updateProfile);
router.post('/updateImage', upload, homeController.updateImage);
router.post('/addPatient', homeController.addPatient);
router.post('/saveReport/:uuid',homeController.saveReport);


module.exports = router;