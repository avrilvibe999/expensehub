const db = require('../config/db');

/* =========================
   DASHBOARD
========================= */
exports.dashboard = (req, res) => {

    if (!req.session.user) {
        return res.redirect('/login');
    }

    const category = req.query.category;
    const userId = req.session.user.id;

    const sql = category
        ? "SELECT * FROM expenses WHERE category = ? AND user_id = ? ORDER BY created_at DESC"
        : "SELECT * FROM expenses WHERE user_id = ? ORDER BY created_at DESC";

    const params = category ? [category, userId] : [userId];

    db.query(sql, params, (err, results) => {

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

/* =========================
   ADD EXPENSE
========================= */
exports.addExpense = (req, res) => {

    if (!req.session.user) {
        return res.redirect('/login');
    }

    const { title, amount, category, expense_date } = req.body;
    const userId = req.session.user.id;

    const sql = `
        INSERT INTO expenses (title, amount, category, expense_date, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [title, amount, category, expense_date, userId], (err) => {

        if (err) {
            console.log(err);
            return res.send('Error al guardar gasto');
        }

        res.redirect('/dashboard');
    });
};

/* =========================
   DELETE EXPENSE
========================= */
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

/* =========================
   EDIT FORM
========================= */
exports.editExpenseForm = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM expenses WHERE id = ?";

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.log(err);
            return res.send("Error al cargar gasto");
        }

        res.render("edit-expense", {
            expense: results[0],
            query: req.query
        });
    });
};

/* =========================
   UPDATE EXPENSE
========================= */
exports.updateExpense = (req, res) => {

    const { id } = req.params;
    const { title, amount, category, expense_date } = req.body;

    if (!title || !amount || !category || !expense_date) {
    return res.redirect(`/edit-expense/${id}?error=1`);
  }

    const sql = `
        UPDATE expenses 
        SET title=?, amount=?, category=?, expense_date=? 
        WHERE id=?
    `;

    db.query(sql, [title, amount, category, expense_date, id], (err) => {

        if (err) {
            console.log(err);
            return res.send("Error al actualizar gasto");
        }

        res.redirect("/dashboard");
    });
};

/* =========================
   TOTAL EXPENSES
========================= */
exports.getTotal = (req, res) => {

    const userId = req.session.user.id;

    const sql = "SELECT SUM(amount) AS total FROM expenses WHERE user_id = ?";

    db.query(sql, [userId], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Error al calcular total");
        }

        res.json(result[0]);
    });
};