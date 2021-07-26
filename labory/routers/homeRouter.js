const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

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

router.post('/addPatient', homeController.addPatient);
router.post('/saveReport/:uuid',homeController.saveReport);


module.exports = router;