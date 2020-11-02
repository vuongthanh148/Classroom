const mongodb = require('mongodb');

mongodb.connect(
    'mongodb://localhost:27017',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(async client => {
    console.log('ok connect db!!!');
    const db = client.db('training');
    class BaseModel {
        constructor(name) {
            this.collection = db.collection(name);
            this.collection.createIndex({gender: 1, yearOfBirth: 1})
        }

        async new(dataInput) {
            const result = await this.collection.insertOne(dataInput)
            return result
        }

        async edit(_id, dataInput) {
            const data = await this.collection.updateMany({ _id: new mongodb.ObjectId(_id) }, {
                $set: dataInput
            });
            return data;
        }

        async delete(_id) {
            const data = await usersCollection.remove({ _id: new mongodb.ObjectId(_id) }, {
                $set: dataInput
            });
            return data;
        }

        async getAll() {
            const data = await this.collection.find({}).toArray()
            return data;
        }
    }

    class User extends BaseModel{
        constructor(){
            const name = 'users';
            super(name);            
        }
    }

    const model = new User();
    // model.new({ name: 'Mr One', yearOfBirth: 1995 })
    // model.edit('5f35201047121b1080f2e9b3', { name: 'Mr One new', yearOfBirth: 1995 }).then(()=>{
    //     console.log('done')
    // })
    // model.getAll().then((data)=>{
    //     console.log(data)
    // })
    
});