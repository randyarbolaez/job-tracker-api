const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/job.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/create', jwtHelper.verifyJwtToken, ctrlUser.jobCreate);
router.get('/joblist', jwtHelper.verifyJwtToken, ctrlUser.jobList);
router.delete('/delete/:job', jwtHelper.verifyJwtToken, ctrlUser.jobRemove);
router.put('/update/:id', jwtHelper.verifyJwtToken, ctrlUser.jobUpdate);
module.exports = router;
