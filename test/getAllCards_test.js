const { BASE_URL } = require('./constants');
const {cardDeleteAll, getAllCards} = require('./helpers');

const expect = require('chai').expect;
const supertest = require('supertest');
const faker = require('faker');
let response;
const request = supertest(BASE_URL);

// let cardsID = [];

describe("GET ALL CARDS. Status and timing", () => {

    before(async() => {
       await cardDeleteAll();
       response = await getAllCards();

    });

    it('TC-01  should return 200 response', function () {
            expect(response.status).equals(200);
    });

    it('TC-02  should return response as Array', function () {
        console.log(response.body);
        expect(response.body).to.be.an('Array');//chai's expect

    });

    it('TC-03  should return 200 response 2', function () {
                let hasErr = false;
                response.body.forEach(el => {
                    if(!(el.hasOwnProperty('priority') && el.hasOwnProperty('name') && el.hasOwnProperty('description'))){
                        hasErr = true;
                        // console.log("Invalid Structure");
                    }
                })
                expect(hasErr).eq(false);
    });

});
