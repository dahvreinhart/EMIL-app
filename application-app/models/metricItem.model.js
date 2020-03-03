const mongoose = require('mongoose');

const MetricItemSchema = mongoose.Schema({
    tempC: {
        type: mongoose.Schema.Types.Decimal128
    },
    speedKph: {
        type: mongoose.Schema.Types.Decimal128
    },
    fuelLevelPct: {
        type: mongoose.Schema.Types.Decimal128
    },
    tirePressureKpa: {
        type: mongoose.Schema.Types.Decimal128
    },
    lat: {
        type: mongoose.Schema.Types.Decimal128
    },
    lng: {
        type: mongoose.Schema.Types.Decimal128
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('MetricItem', MetricItemSchema);