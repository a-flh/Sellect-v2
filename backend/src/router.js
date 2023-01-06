const express = require("express");

const {
  ItemController,
  UsersController,
  FilesController,
  TopicsController,
  MessagesController,
} = require("./controllers");

const { authorization, isAdmin } = require("./middlewares/authMiddleware");
const fileMiddleware = require("./middlewares/fileMiddleware");

const router = express.Router();

router.get("/items", ItemController.browse);
router.get("/items/:id", ItemController.read);
router.put("/items/:id", ItemController.edit);
router.post("/items", ItemController.add);
router.delete("/items/:id", ItemController.delete);

router.post("/auth/users", UsersController.add);
router.get("/users", authorization, isAdmin, UsersController.browse);
router.post("/login/users", UsersController.login);
router.get("/logout/users", UsersController.logout);
router.get("/users/:id", authorization, UsersController.read);
router.get("/users/name/:id", authorization, UsersController.readName);
router.delete("/users/:id", authorization, isAdmin, UsersController.delete);
router.put("/infos/users/:id", authorization, UsersController.editInfos);
router.put("/password/users/:id", authorization, UsersController.editPassword);
router.put("/role/users/:id", authorization, isAdmin, UsersController.editRole);
router.get("/users/sponsors/:sponsorCode", UsersController.readSponsor);
router.get("/users-number", UsersController.browseUsersNumber);

router.post(
  "/upload/contracts",
  authorization,
  fileMiddleware,
  FilesController.addContract
);
router.post(
  "/upload/audit-reports",
  authorization,
  isAdmin,
  fileMiddleware,
  FilesController.addAuditReport
);
router.get("/files/users", authorization, isAdmin, FilesController.browse);
router.get("/files/users/:id", authorization, FilesController.read);
router.get("/download/file/:name", authorization, FilesController.download);
router.get("/visualize/file/:name", FilesController.browsePath);
router.delete("/files/:id", authorization, isAdmin, FilesController.delete);
router.delete(
  "/all-files/:id",
  authorization,
  isAdmin,
  FilesController.deleteFiles
);
router.put(
  "/update/new-contracts/:id",
  authorization,
  isAdmin,
  fileMiddleware,
  FilesController.editContract
);
router.get("/gains/users/:id", authorization, FilesController.readGains);
router.get("/audit-reports-number", FilesController.browseAuditReportsNumber);
router.get("/total-gains-per-month", FilesController.browseTotalGainsPerMonth);

router.post("/add-topic", authorization, TopicsController.add);
router.get("/topics", authorization, TopicsController.browse);
router.delete(
  "/delete-topic/:id",
  authorization,
  isAdmin,
  TopicsController.delete
);
router.delete(
  "/delete-all-topics/:id",
  authorization,
  isAdmin,
  TopicsController.deleteAll
);

router.post("/add-message", authorization, MessagesController.add);
router.put("/edit-message/:id", authorization, MessagesController.editMessage);
router.put(
  "/ban-message/:id",
  authorization,
  isAdmin,
  MessagesController.banMessage
);
router.get("/messages/:id", authorization, MessagesController.read);
router.get("/messages-count/:id", authorization, MessagesController.readCount);
router.delete(
  "/delete-messages/:id",
  authorization,
  isAdmin,
  MessagesController.deleteMessages
);
router.delete(
  "/delete-all-messages/:id",
  authorization,
  isAdmin,
  MessagesController.deleteAllMessages
);

module.exports = router;
