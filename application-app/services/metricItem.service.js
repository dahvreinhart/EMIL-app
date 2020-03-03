const publishToQueue = require('../producers/generic.producer');
const MetricItem = require('../models/metricItem.model');

class MetricItemService {

    sendMetricItemCreationMsg = async () => {
        const data = this.constructNewDataPacket();
        publishToQueue(data);
        return true;
    }

    getAllMetricItems = async () => {
        return await MetricItem.find().sort('-createdAt').exec();
    }

    constructNewDataPacket = () => {
        return {
            tempC: this.getRandomNumber(true, -50, 50),
            speedKph: this.getRandomNumber(true, -20, 250),
            fuelLevelPct: this.getRandomNumber(false, 0, 100),
            tirePressureKpa: this.getRandomNumber(false, 0, 700),
            lat: this.getRandomNumber(true, -90, 90),
            lng: this.getRandomNumber(true, -180, 180),
        }
    }

    getRandomNumber = (canBeNegative, min, max) => {
        let rand = Math.random() * (max - min + 1) + min;
        if (!canBeNegative && rand < 0) rand = rand * -1;
        return rand.toFixed(2);
    }

    createNewMetricItem = async (data) => {
        return await MetricItem.create(data);
    }
}

module.exports = new MetricItemService();