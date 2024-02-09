'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Debtor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Debtor.init({
    obligationNumber: {
      type : DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Obligation Number is Required!'
        },
        notNull: {
          msg: 'Obligation Number is Required!'
        }
      }
    },
    policeNumber: {
      type : DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Police Number is Required!'
        },
        notNull: {
          msg: 'Police Number is Required!'
        }
      }
    },
    owner: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Owner Name is Required!'
        },
        notNull: {
          msg: 'Owner Name is Required!'
        }
      }
    },
    participant: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Participant Name is Required!'
        },
        notNull: {
          msg: 'Participant Name is Required!'
        }
      }
    },
    virtualNumber: {
      type : DataTypes.STRING,
      unique: true,
    },
    formedPrice: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Formed Price is Required!'
        },
        notNull: {
          msg: 'Formed Price is Required!'
        }
      }
    },
    adminFee: {
      type : DataTypes.INTEGER,
    },
    tax: {
      type : DataTypes.INTEGER,
    },
    totalPrice: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Total Price is Required!'
        },
        notNull: {
          msg: 'Total Price is Required!'
        }
      }
    },
    auctionDate: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Auction Date is Required!'
        },
        notNull: {
          msg: 'Auction Date is Required!'
        }
      }
    },
    dueDate: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Due Date is Required!'
        },
        notNull: {
          msg: 'Due Date is Required!'
        }
      }
    },
    paidDate: {
      type : DataTypes.STRING,
    },
    status: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Status is Required!'
        },
        notNull: {
          msg: 'Status is Required!'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Debtor',
  });
  return Debtor;
};