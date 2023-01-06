const AbstractManager = require("./AbstractManager");

class MessagesManager extends AbstractManager {
  static table = "message";

  insert(message) {
    return this.connection.query(
      `INSERT INTO ${MessagesManager.table} (topicId, userId, content) VALUES (?, ?, ?)`,
      [message.topicId, message.userId, message.content]
    );
  }

  findById(topicId) {
    return this.connection.query(
      `SELECT * FROM ${MessagesManager.table} WHERE message.topicId = ?`,
      [topicId]
    );
  }

  getMessagesCount(topicId) {
    return this.connection
      .query(
        `SELECT COUNT(id) AS "number" FROM ${MessagesManager.table} WHERE message.topicId = ?`,
        [topicId]
      )
      .then((res) => res[0]);
  }

  updateMessage(message) {
    return this.connection.query(
      `UPDATE ${MessagesManager.table} SET content = ? where id = ?`,
      [message.content, message.id]
    );
  }

  banMessage(message) {
    return this.connection.query(
      `UPDATE ${MessagesManager.table} SET content = ?, isDeleted = ? where id = ?`,
      [message.content, message.isDeleted, message.id]
    );
  }

  deleteMessages(topicId) {
    return this.connection.query(
      `DELETE FROM ${MessagesManager.table} WHERE topicId = ?`,
      [topicId]
    );
  }

  deleteAllMessages(userId) {
    return this.connection.query(
      `DELETE FROM ${MessagesManager.table} WHERE userId = ?`,
      [userId]
    );
  }
}

module.exports = MessagesManager;
