const pool = require("../config/database");

const getContacts = (req, res) => {
  pool.query("SELECT * FROM contacts", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

const getContact = (req, res) => {
  const { id } = req.params;

  pool.query(`SELECT * FROM contacts WHERE id = ${id}`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No such contact" });
    }
    res.status(200).json(results);
  });
};

const addContact = async (req, res) => {
  const { name, number, description } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!number) {
    emptyFields.push("number");
  }
  if (!description) {
    emptyFields.push("description");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill out all the fields", emptyFields });
  }

  pool.query(
    "INSERT INTO contacts (name, number, description) VALUES (?, ?, ?)",
    [name, number, description],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, name, number, description });
    }
  );
};

const updateContact = (req, res) => {
  const { id } = req.params;
  const { name, number, description } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!number) {
    emptyFields.push("number");
  }
  if (!description) {
    emptyFields.push("description");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill out all the fields", emptyFields });
  }

  pool.query(
    "UPDATE contacts SET name = ?, number = ?, description = ? WHERE id = ?",
    [name, number, description, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "No such contact" });
      }
      res
        .status(200)
        .json({ message: "Contact updated", id, name, number, description });
    }
  );
};

const deleteContact = (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM contacts WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "No such contact" });
    }
    res.status(200).json({ message: "Contact deleted" });
  });
};

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact
};
