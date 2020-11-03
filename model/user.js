const BaseModel = require('../bmapp/index.js').BaseModel;
console.log('baseModel: ',BaseModel)

class Users extends BaseModel {
  /** @param {Partial<Users>} data */
  constructor(data) {
    super('users')
    this._id = '';
    this.name = '';
    this.birthday = '';
    this.sex = '';
  }

  getDataRaw() {
    let rawData = {}
    rawData._id = this._id
    rawData.name = String(this.name)
    rawData.sex = this.sex
    rawData.birthday = String(this.birthday)
    return rawData
  }

  setDataRaw(dataInput) {
    this._id = dataInput._id
    this.name = dataInput.name
    this.sex = dataInput.sex
    this.birthday = dataInput.birthday
  }

}

module.exports = Users;