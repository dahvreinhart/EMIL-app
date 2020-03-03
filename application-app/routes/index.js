var express = require('express');
var router = express.Router();
const MetricItemService = require('../services/metricItem.service');

/*
 * Serve the homepage.
 */
router.get('/', async function (req, res, next) {
    const metricItems = await MetricItemService.getAllMetricItems();
    res.render('index', {
        title: 'EMIL Application Assignment',
        metricItems: metricItems,
    });
});

/*
 * Create a new random metric item and redirect to the homepage
 * after completion to show the updated items list.
 */
router.post('/generate', async function (req, res, next) {
    await MetricItemService.sendMetricItemCreationMsg();
    res.redirect('/');
});

module.exports = router;
