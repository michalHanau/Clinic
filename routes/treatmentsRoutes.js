const express = require('express');
const router = express.Router();

const controller = require('../controllers/TreatmentController')

router.get('/', async (req, res, next) => {
    try {
        const result = await controller.getAll(req.query)
        res.json(result);
    }
    catch (error) {
        if (error.message.startsWith('Not found'))
            res.status(404).send(`Not found`);
        next(error);
    }
})

router.get('/name', async (req, res, next) => {
    try {
        const result = await controller.getTreatmentNames()
        res.json(result);
    }
    catch (error) {
        if (error.message.startsWith('Not found'))
            res.status(404).send(`Not found`);
        next(error);
    }
})

router.get('/id/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await controller.getTreatmentNameById(id);
        res.json(result);
    }
    catch (error) {
        if (error.message.startsWith('Not found'))
            res.status(404).send(`Not found`);
        next(error);
    }
})





module.exports = router;