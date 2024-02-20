const request = require('supertest')
const app = require('../src/index')

test('Shoud list all people from list',  () => {
     request(app).get('/api/v1/people').then( (res) => {
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })
})

test('Should insert a new person', () => {   
    request(app).post('/api/v1/people')
        .send({name: 'Luiz', age: 20})
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body.name).toBe('Luiz')
    })
})