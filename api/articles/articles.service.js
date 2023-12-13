const Article = require("./articles.model");

class ArticleService {
    getAll() {
        return Article.find();
    }
    create(data) {
        const article = new Article(data);
        return article.save();
    }
    update(id, data) {
        return Article.findByIdAndUpdate(id, data, { new: true });
    }
    delete(id) {
        return Article.deleteOne({ _id: id });
    }
    getArticlesForOneUser(id) {
        return Article.find().populate({
            path: "user",
            select: "-password",
            match: { _id: id },
          });
    }
}

module.exports = new ArticleService();