const db = require('../config/db');

exports.dashboard = (req, res) => {
  const category = req.query.category;

  const sql = category
    ? "SELECT * FROM expenses WHERE category = ? ORDER BY created_at DESC"
    : "SELECT * FROM expenses ORDER BY created_at DESC";

  db.query(sql, [category], (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error al obtener gastos");
    }

   
    const categories = {};

    results.forEach(exp => {
      const cat = exp.category || "otros";
      categories[cat] = (categories[cat] || 0) + Number(exp.amount);
    });

    res.render("dashboard", {
      expenses: results,
      selectedCategory: category || "",
      chartData: categories   
    });
  });
};

exports.addExpense = (req, res) => {

    const { title, amount, category, expense_date } = req.body;

    const sql = `
        INSERT INTO expenses (title, amount, category, expense_date)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [title, amount, category, expense_date],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.send('Error al guardar gasto');
            }

            res.redirect('/dashboard');
        }
    );
};

exports.deleteExpense = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM expenses WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res.send("Error al eliminar gasto");
    }

    res.redirect('/dashboard');
  });
};

exports.editExpenseForm = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM expenses WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error al cargar gasto");
    }

    res.render("edit-expense", {
      expense: results[0]
    });
  });
};

exports.updateExpense = (req, res) => {
  const { id } = req.params;
  const { title, amount, category, expense_date } = req.body;

  const sql = `
    UPDATE expenses 
    SET title=?, amount=?, category=?, expense_date=? 
    WHERE id=?
  `;

  db.query(
    sql,
    [title, amount, category, expense_date, id],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Error al actualizar gasto");
      }

      res.redirect("/dashboard");
    }
  );
};

exports.getTotal = (req, res) => {
  const sql = "SELECT SUM(amount) AS total FROM expenses";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error al calcular total");
    }

    res.json(result[0]);
  });
};

exports.filterByCategory = (req, res) => {
  const { category } = req.query;

  const sql = category
    ? "SELECT * FROM expenses WHERE category = ? ORDER BY created_at DESC"
    : "SELECT * FROM expenses ORDER BY created_at DESC";

  db.query(sql, [category], (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error al filtrar gastos");
    }

    res.render("dashboard", {
      expenses: results,
      selectedCategory: category || "" 
    });
  });
};