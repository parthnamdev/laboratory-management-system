const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.index);
router.get('/addPatient', homeController.addPatientPage);
router.get('/createReport', homeController.createReport);
router.get('/manageTest', homeController.manageTest);
router.get('/sendReport', homeController.sendReport);
router.get('/payments', homeController.payments);


module.exports = router;