// keys of user object
const userKeys = {
    password: 'string',
    teamdId: 'number',
    isAdmin: 'boolean',
    userId: 'number',
    BasicInformation: 'object',
}

// example user for testing
const expectedUser = {
    password: 'test1233',
    teamdId: 2,
    isAdmin: true,
    userId: 1,
    BasicInformation: {
      phone: '6932112312',
      surname: 'Beltes',
      name: 'Anastasis',
      weight: 80.5,
      profileimage: '101010111',
      age: 22,
      email: 'tasoulis@example.com',
      height: 185.5
    }
}

module.exports = {
  userKeys,
  expectedUser
}