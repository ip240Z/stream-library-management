const request = require("supertest");
const app = require("../app");
const db = require('../db')

describe("The /books endpoint", () => {
    afterAll(async () => {
        await db.destroy();
    });
    describe(" for GET requests", () => {

        beforeEach(async () => {
            await db('books').insert([
                {title: "JavaScript Design Patterns", author: "Addy Osmani"},
                {title: "The Things They Carry", author: "Unknown"}
            ])
        })

        afterEach(async () => {
            await db('books').del()
        })
        test("responds with a list of books", async () =>{
            // unfulfilled
            // SEAT
            // SETUP & EXECUTE
            const response = await request(app).get('/books');
            // ASSERT
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveLength(2)
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body[0]).toHaveProperty('title')
            expect(response.body[0]).toHaveProperty('author')
        })
    });

    describe(" for POST requests", () => {

        afterEach(async () => {
            await db('books').del()
        })
        test("responds with the added book", async () => {
            //Setup Execute Assert Teardown
            const newBook = { title: "The Scout Mindset", author: "Scout TF2" }

            const response = await request(app).post('/books').send(newBook);

            expect(response.statusCode).toBe(201);
            expect(response.body[0]).toHaveProperty("id");
            expect(response.body[0].title).toBe(newBook.title);
            expect(response.body[0].author).toBe(newBook.author);
        })
    })
});
