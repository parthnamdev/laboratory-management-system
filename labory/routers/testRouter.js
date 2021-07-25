const express = require('express');
const router = express.Router();

const testController = require('../controllers/testController');

router.get('/', testController.index);
router.post('/add', testController.add);
router.post('/addTest', testController.addTest);
router.post('/delete', testController.remove);
router.post('/update',testController.update);
router.post('/updateTest', testController.updateTest);

module.exports = router;