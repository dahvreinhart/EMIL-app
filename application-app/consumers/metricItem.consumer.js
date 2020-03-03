const amqp = require('amqplib/callback_api');
const constants = require('../config/constants');
const MetricItemService = require('../services/metricItem.service');

let msgBus = null;
amqp.connect(constants.MSG_BUS_CONNECTION_URL, function (err0, conn) {
    if (err0) throw err0; 
    conn.createChannel(function (err1, channel) {
        if (err1) throw err1; 
        msgBus = channel;
        msgBus.assertQueue(constants.METRIC_ITEM_QUEUE_NAME, { durable: false });
        msgBus.consume(constants.METRIC_ITEM_QUEUE_NAME, function(msg) {
            MetricItemService.createNewMetricItem(JSON.parse(msg.content));
            msgBus.ack(msg);
        }, {
            noAck: false
        });
    });
});
