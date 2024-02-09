const { Debtor } = require('../models');
const { Op } = require('sequelize');
const excel = require('exceljs');
const fs = require('fs');

class DebtorController {
    static async getAllDebtors(req, res, next) {
        try {
            const debtors = await Debtor.findAll({
                order: [['id', 'ASC']]
            });
            res.status(200).json(debtors);
        } catch (error) {
            next(error);
        }
    }    

    static async exportDebtorsToExcel(req, res, next) {
        try {
            const filteredData = req.body;
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Debtors');
    
            worksheet.columns = [
                { header: 'Obligation Number', key: 'obligationNumber', width: 25 },
                { header: 'Police Number', key: 'policeNumber', width: 25 },
                { header: 'Owner', key: 'owner', width: 25 },
                { header: 'Participant', key: 'participant', width: 25 },
                { header: 'Virtual Number', key: 'virtualNumber', width: 25 },
                { header: 'Formed Price', key: 'formedPrice', width: 15 },
                { header: 'Admin Fee', key: 'adminFee', width: 15 },
                { header: 'Tax', key: 'tax', width: 15 },
                { header: 'Total Price', key: 'totalPrice', width: 15 },
                { header: 'Auction Date', key: 'auctionDate', width: 20 },
                { header: 'Due Date', key: 'dueDate', width: 20 },
                { header: 'Paid Date', key: 'paidDate', width: 20 },
                { header: 'Status', key: 'status', width: 25 }
            ];
            filteredData.forEach(debtor => {
                worksheet.addRow({
                    obligationNumber: debtor.obligationNumber,
                    policeNumber: debtor.policeNumber,
                    owner: debtor.owner,
                    participant: debtor.participant,
                    virtualNumber: debtor.virtualNumber,
                    formedPrice: debtor.formedPrice,
                    adminFee: debtor.adminFee,
                    tax: debtor.tax,
                    totalPrice: debtor.totalPrice,
                    auctionDate: debtor.auctionDate,
                    dueDate: debtor.dueDate,
                    paidDate: debtor.paidDate,
                    status: debtor.status
                });
            });
    
            const fileName = 'debtors.xlsx';
            workbook.xlsx.writeFile(fileName)
                .then(() => {
                    res.download(fileName, fileName, (err) => {
                        if (err) {
                            throw err;
                        }
                        fs.unlinkSync(fileName);
                    });
                })
                .catch((error) => {
                    throw error;
                });
        } catch (error) {
            next(error);
        }
    }
    

    static async markAsPaid(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id);
            const debtor = await Debtor.findByPk(id);
            if (!debtor) {
                res.status(404).json({ message: 'Data has not found' });
                return;
            }
            debtor.status = 'LUNAS';
            debtor.paidDate = new Date().toISOString().slice(0, 10);
            await debtor.save();
            res.status(200).json({ message: 'Payment status updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    static async searchDebtors(req, res, next) {
        try {
            const {
                obligationNumber,
                policeNumber,
                owner,
                participant,
                virtualNumber,
                maxFormedPrice,
                minFormedPrice,
                maxAdminFee,
                minAdminFee,
                maxTax,
                minTax,
                maxTotalPrice,
                minTotalPrice,
                status,
                minDueDate,
                maxDueDate,
                minPaidDate,
                maxPaidDate,
                minAuctionDate,
                maxAuctionDate
            } = req.query;

            const searchCriteria = {};

            if (obligationNumber) {
                searchCriteria.obligationNumber = {
                    [Op.iLike]: `%${obligationNumber}%`
                };
            }

            if (virtualNumber) {
                searchCriteria.virtualNumber = {
                    [Op.iLike]: `%${virtualNumber}%`
                };
            }

            if (policeNumber) {
                searchCriteria.policeNumber = {
                    [Op.iLike]: `%${policeNumber}%`
                };
            }

            if (owner) {
                searchCriteria.owner = {
                    [Op.iLike]: `%${owner}%`
                };
            }

            if (participant) {
                searchCriteria.participant = {
                    [Op.iLike]: `%${participant}%`
                };
            }

            if (minFormedPrice || maxFormedPrice) {
                searchCriteria.formedPrice = {};
                if (minFormedPrice) {
                    searchCriteria.formedPrice[Op.gte] = parseInt(minFormedPrice);
                }
                if (maxFormedPrice) {
                    searchCriteria.formedPrice[Op.lte] = parseInt(maxFormedPrice);
                }
            }

            if (minAdminFee || maxAdminFee) {
                searchCriteria.adminFee = {};
                if (minAdminFee) {
                    searchCriteria.adminFee[Op.gte] = parseInt(minAdminFee);
                }
                if (maxAdminFee) {
                    searchCriteria.adminFee[Op.lte] = parseInt(maxAdminFee);
                }
            }

            if (minTax || maxTax) {
                searchCriteria.tax = {};
                if (minTax) {
                    searchCriteria.tax[Op.gte] = parseInt(minTax);
                }
                if (maxTax) {
                    searchCriteria.tax[Op.lte] = parseInt(maxTax);
                }
            }

            if (minTotalPrice || maxTotalPrice) {
                searchCriteria.totalPrice = {};
                if (minTotalPrice) {
                    searchCriteria.totalPrice[Op.gte] = parseInt(minTotalPrice);
                }
                if (maxTotalPrice) {
                    searchCriteria.totalPrice[Op.lte] = parseInt(maxTotalPrice);
                }
            }

            if (status) {
                searchCriteria.status = {
                    [Op.iLike]: `%${status}%`
                };
            }

            if (minDueDate || maxDueDate) {
                searchCriteria.dueDate = {};
                if (minDueDate) {
                    searchCriteria.dueDate[Op.gte] = new Date(minDueDate);
                }
                if (maxDueDate) {
                    searchCriteria.dueDate[Op.lte] = new Date(maxDueDate);
                }
            }

            if (minPaidDate || maxPaidDate) {
                searchCriteria.paidDate = {};
                if (minPaidDate) {
                    searchCriteria.paidDate[Op.gte] = new Date(minPaidDate);
                }
                if (maxPaidDate) {
                    searchCriteria.paidDate[Op.lte] = new Date(maxPaidDate);
                }
            }

            if (minAuctionDate || maxAuctionDate) {
                searchCriteria.auctionDate = {};
                if (minAuctionDate) {
                    searchCriteria.auctionDate[Op.gte] = new Date(minAuctionDate);
                }
                if (maxAuctionDate) {
                    searchCriteria.auctionDate[Op.lte] = new Date(maxAuctionDate);
                }
            }

            const debtors = await Debtor.findAll({
                where: searchCriteria
            });

            res.status(200).json(debtors);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = DebtorController;
