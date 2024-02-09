const express = require('express')
const DebtorController = require('../controllers/controller');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router()

router.get('/debtors', DebtorController.getAllDebtors);
router.post('/debtors/export', DebtorController.exportDebtorsToExcel);
router.patch('/debtors/:id/mark-as-paid', DebtorController.markAsPaid);
router.get('/debtors/search', DebtorController.searchDebtors);

router.use(errorHandler)

module.exports = router