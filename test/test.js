const { BASE_URL } = require('./constants');

const { expect } = require('chai');
const axios = require('axios');

function sum (a, b){
    return a+b;
}

it('API should return array', function () {
   return axios.get(BASE_URL)
       .then(res => {
           console.log(res.data)
           expect(res.data).to.be.an('array')
       })
});

it('API should create a card', function () {
    return axios({
        method: 'POST',
        url: 'https://nazarov-kanban-server.herokuapp.com/card',
        data: {
            name: "Axios",
            description: '123 1234 56',
            priority: 1,
            status: 'todo'
        }
    })
        .then(res => {
            console.log(res.data)
            expect(res.status).eq(201)
            expect(res.data).eq('Card created')
        })
});

let cardIdForDelete;

it('API should get card list', function () {
    return axios({
        method: "GET",
        url: 'https://nazarov-kanban-server.herokuapp.com/card',
    })
        .then(res => {
            expect(res.status).eq(200)
            expect(res.data).an('array')
            cardIdForDelete = res.data[0]._id;
            console.log(cardIdForDelete)
        })
});

it('API should delete card', () => {
    return axios({
        method: 'DELETE',
        url: `https://nazarov-kanban-server.herokuapp.com/card/${cardIdForDelete}`,
    })
        .then(res => {
            expect(res.status).eq(200)
            expect(res.data).eq('Card deleted')
        })
});

it('API should verify card is deleted', async () => {
    const result = await axios({
        method: 'GET',
        url: `https://nazarov-kanban-server.herokuapp.com/card/${cardIdForDelete}`,
        })
        .then(res => res.data)
        .catch(err => err.response)

    expect(result.status).eq(404)
});