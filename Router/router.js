const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = multer();
const controller = require("../Controller/controller");
const newsController = require("../Controller/newsController");
const isAdminCheck = require("../auth/auth");

route.post("/api/register", controller.register);
route.post("/api/login", controller.login);
route.get("/api/isAuth", controller.isAuth);
route.get("/mainSearch", controller.mainSearch);
route.get("/api/getNewsByLiveUpdateType/:liveUpdateType",
  controller.getNewsByLiveUpdateType
);
route.get(
  "/api/getOldestNewsArticleByType/:liveUpdateType",
  controller.getOldestNewsArticleByType
);

// ..............News Route...........
const { connectDB } = require("../Database/connection");
const { VideoLink } = require("../Model/model");

route.get("/api/news", newsController.getNews);
route.get(
  "/api/getNewsByArticleId/:articleId",
  newsController.getNewsByArticleId
);
route.get("/api/types", newsController.getNewsType);
route.post("/api/createnews",isAdminCheck, upload.single("file"), function (req, res, next) {
  newsController.createNews(req, res, next, connectDB.client);
});
route.get("/api/tags", newsController.getTags);
route.get(
  "/api/getLastFiveLiveUpdateNewsType",
  newsController.getLastFiveLiveUpdateNewsType
);
route.get("/api/getHeadline/:liveUpdateType", newsController.getHeadLine);
route.get("/api/getAllNewsCategories", newsController.getAllNewsCategories);
route.get(
  "/api/getsubcategories/:catName",
  newsController.getAllNewsSubCategories
);
route.get("/newsList", newsController.newsList);

route.delete("/api/news/:id",isAdminCheck, newsController.deleteNews);
route.get("/getNewsByID/:id", newsController.getNewsById);
route.post("/api/updatenews",isAdminCheck, upload.single("file"), newsController.updateNews);
route.get(
  "/filesForNewsByFilename/:filename",
  newsController?.filesForNewsByFilename
);
route.get(
  "/api/AllCategoriesWithSubCategory",
  newsController.AllCategoriesWithSubCategory
);
route.delete(
  "/api/deleteCategories/:categoryId",
  isAdminCheck,
  newsController.deleteCategory
);
route.delete(
  "/api/categories/:categoryId/subcategories/:subcategoryId",
  isAdminCheck,
  newsController.deleteSubcategory
);
route.post("/api/addCategories",isAdminCheck, newsController.addCategory);
route.post("/api/addTag",isAdminCheck, newsController.addTag);

route.delete("/api/deleteTag/:tagId",isAdminCheck, newsController.deleteTag);
route.get("/api/users", newsController.users);
route.get("/api/getRoles", newsController.getRoles);
route.post("/api/assignRole/:userId",isAdminCheck, newsController.assignRole);
route.delete(
  "/api/deleteUsersManually/:id",
  isAdminCheck,
  newsController.deleteUsersManually
);
route.get("/api/user/:userid", newsController.getUserbyID);
route.get("/api/isAuth", controller.isAuth);

route.post("/api/updateUserData/:userid",isAdminCheck, newsController.updateUserData);
route.get("/api/support", newsController.getSupportForm);
route.post("/api/support",isAdminCheck, newsController.supportForm);
// ..............News Route...........

route.post('/api/video/link',async(req,res)=>{
  const link = new VideoLink({link:req.body.link});
   await link.save();
   res.status(200).send({msg:"Addes"})
})
route.get('/api/video/link',async(req,res)=>{
  const link = await VideoLink.find({});
   res.status(200).send({data:link})
})
module.exports = route;
