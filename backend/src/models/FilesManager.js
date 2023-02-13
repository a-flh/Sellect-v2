const AbstractManager = require("./AbstractManager");

class FilesManager extends AbstractManager {
  static table = "file";

  insert(file) {
    return this.connection.query(
      `INSERT INTO ${FilesManager.table} (id, userId, name, content, category, initialCost) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        file.id,
        file.userId,
        file.name,
        file.content,
        file.category,
        file.initialCost,
      ]
    );
  }

  findByUserId(userId) {
    return this.connection
      .query(`SELECT * FROM ${FilesManager.table} WHERE userId = ?`, [userId])
      .then((res) => res[0]);
  }

  updateContract(file) {
    return this.connection.query(
      `UPDATE ${FilesManager.table} SET userId = ?, name = ?, content = ?, updateDate = ?, 
      newCost = ?, gain = ? where id = ?`,
      [
        file.userId,
        file.name,
        file.content,
        file.updateDate,
        file.newCost,
        file.gain,
        file.id,
      ]
    );
  }

  findAuditReportsNumber() {
    return this.connection
      .query(
        `SELECT COUNT(id) AS "number" FROM ${FilesManager.table} WHERE file.category 
        = "Compte-rendu d'audit"`
      )
      .then((res) => res[0]);
  }

  findGainsByUserId(userId) {
    return this.connection
      .query(`SELECT gain FROM ${FilesManager.table} WHERE userId = ?`, [
        userId,
      ])
      .then((res) => res[0]);
  }

  findTotalGainsPerMonth() {
    return this.connection
      .query(`SELECT SUM(gain) AS "total" FROM ${FilesManager.table}`)
      .then((res) => res[0]);
  }

  deleteAll(userId) {
    return this.connection.query(
      `DELETE FROM ${FilesManager.table} WHERE userId = ?`,
      [userId]
    );
  }
}

module.exports = FilesManager;
