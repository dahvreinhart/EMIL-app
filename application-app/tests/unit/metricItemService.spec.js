const MetricItemService = require('../../services/metricItem.service');
jest.mock('../../producers/generic.producer');
const publishToQueue = require('../../producers/generic.producer');

describe('MetricItemService Unit Tests', () => {

    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe('sendMetricItemCreationMsg()', () => {

        it('should succeed and call `publishToQueue()` with test value', async () => {
            const mockData = 'TEST';
            const mockConstructNewDataPacket = jest.spyOn(MetricItemService, 'constructNewDataPacket').mockReturnValue(mockData);

            const result = await MetricItemService.sendMetricItemCreationMsg();

            expect(result).toEqual(true);
            expect(publishToQueue).toHaveBeenCalledTimes(1);
            expect(publishToQueue).toHaveBeenCalledWith(mockData);
            expect(mockConstructNewDataPacket).toHaveBeenCalledTimes(1);
        });

    });

    describe('constructNewDataPacket()', () => {

        it('should succeed and return a packed of test data', async () => {
            const mockGetRandomNumber = jest.spyOn(MetricItemService, 'getRandomNumber').mockReturnValue(1);

            const result = MetricItemService.constructNewDataPacket();

            expect(result).toEqual({
                tempC: 1,
                speedKph: 1,
                fuelLevelPct: 1,
                tirePressureKpa: 1,
                lat: 1,
                lng: 1,
            });
            expect(mockGetRandomNumber).toHaveBeenCalledTimes(6);
        });

    });

    describe('getRandomNumber()', () => {

        it('should succeed and return random positive numbers all within the specified range', async () => {
            const canBeNegative = false;
            const min = 0;
            const max = 100;

            for (const i in Array(100).keys()) {
                const result = MetricItemService.getRandomNumber(canBeNegative, min, max);

                expect(result).toBeLessThan(max);
                expect(result).toBeGreaterThan(min);
            }
        });

        it('should succeed and return random positive and negative numbers all within the specified range', async () => {
            const canBeNegative = true;
            const min = -100;
            const max = 100;

            for (const i in Array(100).keys()) {
                const result = MetricItemService.getRandomNumber(canBeNegative, min, max);

                expect(result).toBeLessThan(max);
                expect(result).toBeGreaterThan(min);
            }
        });

    });

});
