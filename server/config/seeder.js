const { readFileSync } = require('fs');
const { run, getDb, close } = require('../config/mongodb');
const usersDataPath = './assets/user-seeder.csv';
const collectionName = 'users';

// Read Data
const usersRead = readFileSync(usersDataPath, 'utf-8').split('\r\n').splice(1);

const users = usersRead.map((el) => {
  const [username, email, password, role] = el.split(',');

  return ({ username, email, password, role });
});

// Seeder
class UserSeeder {
  static async userTableCreate () {
    return getDb().createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['username', 'email', 'password', 'role'],
          properties: {
            username: {
              bsonType: 'string',
              description: 'Username is required'
            },  
            email: {
              bsonType: 'string',
              description: 'Email is required'
            },
            password: {
              bsonType: 'string',
              description: 'Password is required'
            },
            role: {
              bsonType: 'string',
              description: 'Role is required'
            },
          }
        }
      }
    })
  };

  static async userBulkInsert () {
    return getDb().collection(`${collectionName}`)
    .insertMany(users);
  };

  static async userBulkDelete () {
    return getDb().collection(`${collectionName}`)
    .deleteMany()
  };
};

run()
  .then(async () => {
    // console.log('Creating table...')
    // await UserSeeder.userTableCreate()
    console.log('Seeding...')
    await UserSeeder.userBulkDelete();
    await UserSeeder.userBulkInsert();
    return close()
  })
  .then(() => {
    console.log('Seeding Success..')
  })
  .catch((err) => {
    console.log(err)
    console.log('Seeding Failed..')
  })
