import Models from '../../../models/all'
import {sequelize} from '../../db'
import {TRANSACTION_FEE, TRANSACTION_FEE_PAYER} from '../../constants'

export const createInnerTransactions = async (sendingAccountId, receivingAccountId, amount, content, feePayer) => {
  let increasingAmount = amount
  let decreasingAmount = amount
  if (feePayer === TRANSACTION_FEE_PAYER.SENDER) {
    decreasingAmount += TRANSACTION_FEE
  }
  else {
    increasingAmount -= TRANSACTION_FEE
  }

  await sequelize.transaction(async (t) => {
    await Models.Accounts.decrement(['balance'], {
      by: decreasingAmount,
      where: {id: sendingAccountId, isDeleted: false}
    }, {transaction: t})

    await Models.Accounts.increment(['balance'], {
      by: increasingAmount,
      where: {id: receivingAccountId, isDeleted: false}
    }, {transaction: t})

    await Models.InnerTransactions.create({
      sendingAccountId, receivingAccountId, amount, content, feePayer
    }, {transaction: t})
  })
}