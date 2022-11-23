const { Router } = require('express');
const router = Router();


const{ renderIndex, createIndex, renderNewEntry, createNewEntry, renderLogIn, createLogIn, renderRecived ,renderSignUp, createSignUp, renderChart, createEntries, renderEntries, renderBrigade} = require('../controllers/entries.controllers')

router.get('/', renderIndex);
router.post('/', createIndex);

router.get('/new-entry', renderNewEntry);
router.post('/new-entry', createNewEntry);

router.get('/log-in', renderLogIn);
router.post('/log-in', createLogIn);

router.get('/recibido', renderRecived);

router.get('/sign-up', renderSignUp);
router.post('/sign-up', createSignUp);

router.get('/entries', createEntries);
router.post('/entries', renderEntries);

router.get('/chart', renderChart);
router.get('/brigades', renderBrigade);

module.exports = router;