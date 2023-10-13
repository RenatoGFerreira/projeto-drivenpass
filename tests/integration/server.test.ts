import server from "../../src/server"
import supertest from "supertest"

const app = supertest(server)


describe("User tests", ()=>{
    it("Should create a user", async() => {
      const {statusCode} = await app.post("/sign-up").send({
        email: "leticia@leticia.com",
        password: "123456"
      })
    
      expect(statusCode).toBe(201)
    })

    it("Should create sign-in", async() => {
        const {statusCode} = await app.post("/sign-in").send({
            email: "leticia@leticia.com",
            password: "123456"
        })
      
        expect(statusCode).toBe(200)
      })
   
})