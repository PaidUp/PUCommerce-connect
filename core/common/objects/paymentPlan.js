module.exports = {
  destinationId: 'destinationId',
  dateCharge: '2016-05-05',
  price: 100,
  typeAccount: 'typeAccount',
  account: 'account',
  discount: 0, // optional default 0
  discountCode: 'discountCode', // optional
  wasProcessed: false,// optional default false
  status: 'pending',// optional default pending
  processingFees: {
    cardFeeActual: 12,
    cardFeeDisplay: 21,
    cardFeeFlatActual: 12,
    cardFeeFlatDisplay: 21,
    achFeeActual: 12,
    achFeeDisplay: 21,
    achFeeFlatActual: 12,
    achFeeFlatDisplay: 21
  },
  collectionsFee: {
    fee: 12,
    feeFlat: 21
  },
  paysFees: {
    processing: true,
    collections: true
  },
  productInfo: {
    productId: 'productId',
    productName: 'productName'
  },
  userInfo: {
    userId: 'UserId',
    userName: 'userName'
  },
  beneficiaryInfo: {
    beneficiaryId: 'beneficiaryId',
    beneficiaryName: 'beneficiaryName'
  }
}
