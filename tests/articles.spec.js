const request = require("supertest");
const mockingoose = require("mockingoose");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { app } = require("../server");
const Article = require("../api/articles/articles.model");

describe("tester API articles", () => {
    let token;
    const USER_ID = "fake";
    const MOCK_DATA = [
        {
          _id: USER_ID,
          name: "ana",
          email: "nfegeg@gmail.com",
          password: "azertyuiop",
        },
    ];
    const MOCK_DATA_ARTICLE = {
        title: "article1",
        content: "ceci est l'article1",
        user: USER_ID,
        state: "draft"
    };
    const MOCK_DATA_ARTICLE_MODIFIED = {
        title: "article1bis",
        content: "ceci est l'article1bis",
        user: USER_ID,
        state: "published"
    };

    beforeEach(() => {
        token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
        mockingoose(Article).toReturn(MOCK_DATA, "find");
        mockingoose(Article).toReturn(MOCK_DATA_ARTICLE, "save");
        mockingoose(Article).toReturn(MOCK_DATA_ARTICLE, "findByIdAndUpdate");
        mockingoose(Article).toReturn(MOCK_DATA_ARTICLE, "deleteOne");
    });
// création
    test('[Articles] Create Articles', async () => {
        const res = await request(app)
        .post("/api/articles")
        .send(MOCK_DATA_ARTICLE)
        .set("x-access-token", token);
        expect(res.body.name).toBe(MOCK_DATA_ARTICLE.name);
        expect(res.status).toBe(201);
    });
// mis à jour
    test('[Articles] Update Articles', async () => {
        const res = await request(app)
        .put(`/api/articles/${USER_ID}`)
        .send(MOCK_DATA_ARTICLE_MODIFIED)
        .set("x-access-token", token);
        expect(res.body.name).toBe(MOCK_DATA_ARTICLE_MODIFIED.name);
        expect(res.status).toBe(200);
    });
// suppression
    test('[Articles] Delete Articles', async () => {
        const res = await request(app)
        .delete(`/api/articles/${USER_ID}`)
        .send(MOCK_DATA_ARTICLE_MODIFIED)
        .set("x-access-token", token);
        expect(res.body.name).toBe(MOCK_DATA_ARTICLE_MODIFIED.name);
        expect(res.status).toBe(204);
    });
});