const AbstractManager = require("./AbstractManager");

class TopicsManager extends AbstractManager {
  static table = "topic";

  insert(topic) {
    return this.connection.query(
      `INSERT INTO ${TopicsManager.table} (userId, content) VALUES (?, ?)`,
      [topic.userId, topic.content]
    );
  }

  deleteAll(userId) {
    return this.connection.query(
      `DELETE FROM ${TopicsManager.table} WHERE userId = ?`,
      [userId]
    );
  }
}

module.exports = TopicsManager;
