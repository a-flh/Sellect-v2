const models = require("../models");

class FilesController {
  static browse = (req, res) => {
    models.file
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static browseAuditReportsNumber = (req, res) => {
    models.file
      .findAuditReportsNumber()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static browseTotalGainsPerMonth = (req, res) => {
    models.file
      .findTotalGainsPerMonth()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    const userId = req.params.id;

    models.file
      .findByUserId(userId)
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

  static readGains = (req, res) => {
    const userId = req.params.id;

    models.file
      .findGainsByUserId(userId)
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

  static editContract = (req, res) => {
    const file = {
      ...req.body,
      id: parseInt(req.params.id, 10),
      content: req.files.file.newFilename,
      newCost: parseInt(req.body.newCost, 10),
      gain: parseInt(req.body.gain, 10),
    };

    models.file
      .updateContract(file)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.status(201).send({ ...file });
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static addContract = (req, res) => {
    const file = { ...req.body, content: req.files.file.newFilename };

    models.file
      .insert(file)
      .then(([result]) => {
        res.status(201).send({ ...file, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static addAuditReport = (req, res) => {
    const file = {
      ...req.body,
      content: req.files.file.newFilename,
      category: "Compte-rendu d'audit",
    };

    models.file
      .insert(file)
      .then(([result]) => {
        res.status(201).send({ ...file, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.file
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static deleteFiles = (req, res) => {
    const userId = req.params.id;

    models.file
      .deleteAll(userId)
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

  static download = (req, res) => {
    const { name } = req.params;
    res.status(200).download(`${__dirname}/../../uploads/${name}`, name);
  };

  static browsePath = (req, res) => {
    const { name } = req.params;
    res.status(200).json({ path: `${name}` });
  };
}

module.exports = FilesController;
