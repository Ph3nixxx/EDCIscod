const articlesService = require("./articles.service");

class ArticlesController {
    async getAll(req, res, next) {
        try {
          const articles = await articlesService.getAll();
          res.json(articles);
        } catch (err) {
          next(err);
        }
    }
    async create(req, res, next) {
        try {
          const article = await articlesService.create(req.body);
          req.io.emit("article:create", article);
          res.status(201).json(article);
        } catch (err) {
          next(err);
        }
      }
    async update(req, res, next) {
        try {
          const token = req.headers["x-access-token"];
          const decoded = jwt.verify(token, config.secretJwtToken);
          req.user = decoded;
          console.log(decoded)
          if(req.user.role.value === "admin") {
            const id = req.params.id;
            const data = req.body;
            const articleModified = await articlesService.update(id, data);
            req.io.emit("article:update", article);
            res.status(200).json(article);
            res.json(articleModified);
          } else {
            throw new UnauthorizedError();
          }
        } catch (err) {
          next(err);
        }
    }
    async delete(req, res, next) {
        try {
          const token = req.headers["x-access-token"];
          const decoded = jwt.verify(token, config.secretJwtToken);
          req.user = decoded;
          console.log(decoded)
          if(req.user.role.value === "admin") {
            const id = req.params.id;
            await articlesService.delete(id);
            req.io.emit("article:delete", { id });
            res.status(204).send();
          } else {
            throw new UnauthorizedError();
          }
        } catch (err) {
          next(err);
        }
    }
}

module.exports = new ArticlesController();