const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');

router.get('/dashboard', expenseController.dashboard);

router.post('/add-expense', expenseController.addExpense);

router.get("/delete-expense/:id", expenseController.deleteExpense);

router.get('/edit-expense/:id', expenseController.editExpenseForm);
router.post('/update-expense/:id', expenseController.updateExpense);

router.get('/total-expenses', expenseController.getTotal);

router.get('/dashboard', expenseController.filterByCategory);

module.exports = router;