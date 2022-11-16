const { Router } = require('express');
const router = Router();

const{ renderIndex, renderNewEntry, createNewEntry, renderLogIn, createLogIn, renderRecived ,renderChart} = require('../controllers/entries.controllers')

router.get('/', renderIndex);

router.get('/new-entry', renderNewEntry);

router.post('/new-entry', createNewEntry);

router.get('/log-in', renderLogIn);

router.post('/log-in', createLogIn);

router.get('/recibido', renderRecived);

router.get('/chart', renderChart);
module.exports = router;