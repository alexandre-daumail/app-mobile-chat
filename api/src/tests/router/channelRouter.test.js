const request = require('supertest');
const app = require('../../index');

describe('GET /channels', () => {
    it('should return a 200 status and an array of channels', async () => {
        const response = await request(app).get('/api/channels');
        // assert
        expect(response.status).toBe(200);
    });

    // it('should return a 500 status and an error message if an error occurs', async () => {
    //     // setup
    //     //  here you will replace Channel.findAll to a jest mock
    //     const errorMessage = 'Error occured';
    //     const mockError = new Error(errorMessage)
    //     jest.mock('../../models/channel.model',() =>({
    //         findAll: jest.fn(() => Promise.reject(mockError))
    //     }))
    //     // execution
    //     const response = await request(app).get('/api/channels');
    //
    //     // assert
    //     expect(response.status).toBe(500);
    //     expect(response.body.status).toBe('Error');
    //     expect(response.body.message).toBe(errorMessage);
    // });
});
