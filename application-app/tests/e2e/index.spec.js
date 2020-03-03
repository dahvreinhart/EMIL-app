const app = require('../../app');
const request = require('supertest');
const MetricItem = require('../../models/metricItem.model');

describe('Index Routes End-To-End Tests', () => {

    describe('GET `/`', () => {

        it('should succeed and serve the homepage', async () => {
            return await request(app)
                .get('/')
                .expect(200)
                .then(res => {
                    expect(res.text).toBeDefined();
                });
        });

    });

    describe('GET `/generate`', () => {

        it('should succeed, create a new MetricItem in the DB and redirect to the homepage', async () => {
            const numItemsOld = await MetricItem.find().count().exec();
            return await request(app)
                .post('/generate')
                .expect(302)
                .then(async res => {
                    const numItemsNew = await MetricItem.find().count().exec();

                    expect(res.text).toBeDefined();
                    expect(res.redirect).toEqual(true);
                    expect(numItemsNew).toEqual(numItemsOld + 1);
                });
        });

    });

});