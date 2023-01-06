const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  static table = "user";

  insert(user) {
    return this.connection.query(
      `INSERT INTO ${UsersManager.table} (id, firstname, lastname, phoneNumber, email, password, sponsorCode, referralCode, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        user.firstname,
        user.lastname,
        user.phoneNumber,
        user.email,
        user.password,
        user.sponsorCode,
        user.referralCode,
        user.role,
      ]
    );
  }

  findByEmail(user) {
    return this.connection
      .query(`SELECT * FROM ${UsersManager.table} WHERE email = ?`, [
        user.email,
      ])
      .then((res) => res[0]);
  }

  findById(userId) {
    return this.connection
      .query(`SELECT * FROM ${UsersManager.table} WHERE id = ?`, [userId])
      .then((res) => res[0]);
  }

  findNameById(userId) {
    return this.connection
      .query(
        `SELECT firstname, lastname FROM ${UsersManager.table} WHERE id = ?`,
        [userId]
      )
      .then((res) => res[0]);
  }

  updateInfos(user) {
    return this.connection.query(
      `UPDATE ${UsersManager.table} SET phoneNumber = ?, email = ? where id = ?`,
      [user.phoneNumber, user.email, user.id]
    );
  }

  updatePassword(user) {
    return this.connection.query(
      `UPDATE ${UsersManager.table} SET password = ? where id = ?`,
      [user.password, user.id]
    );
  }

  updateRole(user) {
    return this.connection.query(
      `UPDATE ${UsersManager.table} SET role = ? where id = ?`,
      [user.role, user.id]
    );
  }

  findBySponsorCode(sponsorCode) {
    return this.connection
      .query(
        `SELECT firstname, lastname FROM ${UsersManager.table} WHERE referralCode = ?`,
        [sponsorCode]
      )
      .then((res) => res[0]);
  }

  findUsersNumber() {
    return this.connection
      .query(`SELECT COUNT(id) AS "number" FROM ${UsersManager.table}`)
      .then((res) => res[0]);
  }
}

module.exports = UsersManager;
