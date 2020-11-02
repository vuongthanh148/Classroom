const mongodb = require('mongodb')

mongodb.connect(
  'mongodb://localhost:27017',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(async client => {
  const db = client.db('training')
  // const usersCollection = db.collection('users')
  // const data = await usersCollection.find({ yearOfBirth: 2000 }).toArray()
  // console.log(data)
  // const result = await usersCollection.insertOne({name: 'Sep Nam', yearOfBirth: 1988})
  // console.log(result);
  // try {
  //   const resultUpdate = await usersCollection.updateMany({ yearOfBirth: { $in: [1988, 1990] } }, { $set: { name: 'Sep Nam bi doi ten lan 2', yearOfBirth: 1991 } })
  //   console.log(resultUpdate);

  // } catch (error) {
  //   console.error(error);
  // }
  class BaseModel {
    constructor(collectionName) {
      this.name = collectionName;
      this.collection = db.collection(collectionName)
    }
    save() {
      return this.collection.save(this.raw)
    }
    // update() {
    //   const raw = this.raw
    //   delete raw._id
    //   return this.collection.updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: raw })
    // }

  }
  class Users extends BaseModel {
    /** @param {Partial<Users>} data */
    constructor(data) {
      super('users')
      this._id = data._id
      this.name = data.name
      this.yearOfBirth = data.yearOfBirth
      this.birth = {
        date: 1,
        month: 2, 
        year: data.yearOfBirth
      }
    }
    get raw() {
      let raw = {}
      if (this._id !== undefined) raw._id = new mongodb.ObjectId(this._id)
      if (this.name !== undefined) raw.name = String(this.name)
      if (this.yearOfBirth !== undefined) raw.yearOfBirth = Number(this.yearOfBirth)
      // if (this.yearOfBirth !== undefined) raw.yearOfBirth = Number(this.yearOfBirth)
      if (this.birth !== undefined) raw.birth = this.birth
      return raw
    }
  }

  // let user1 = new Users({ name: 'Linh 2', _id: '5f1ec854320bff2b2427b8f4' })
  let user2 = new Users({ name: 'Linh 3', yearOfBirth: '1995' })
  await user2.save()
  // const resultSave = await new Users({ name: 'Linh 2', yearOfBirth: '1994' }).save()
  // console.log(resultSave);
  class Customers extends BaseModel {
    constructor(data) {
      super('customers')
    }
  }
  client.close()
})
