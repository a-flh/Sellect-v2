const models = require("../models");

class MessagesController {
  static read = (req, res) => {
    const topicId = parseInt(req.params.id, 10);

    models.message
      .findById(topicId)
      .then((rows) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static readCount = (req, res) => {
    const topicId = parseInt(req.params.id, 10);

    models.message
      .getMessagesCount(topicId)
      .then((rows) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static editMessage = (req, res) => {
    const { content } = req.body;
    const { id } = req.params;

    models.message
      .updateMessage({ id, content })
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static banMessage = (req, res) => {
    const { content, isDeleted } = req.body;
    const { id } = req.params;

    models.message
      .banMessage({ id, content, isDeleted })
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const message = req.body;

    models.message
      .insert(message)
      .then(([result]) => {
        res.status(201).send({ ...message, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static deleteMessages = (req, res) => {
    const topicId = req.params.id;

    models.message
      .deleteMessages(topicId)
      .then((rows) => {
        if (rows.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(rows);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static deleteAllMessages = (req, res) => {
    const userId = req.params.id;

    models.message
      .deleteAllMessages(userId)
      .then((rows) => {
        if (rows.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(rows);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = MessagesController;
