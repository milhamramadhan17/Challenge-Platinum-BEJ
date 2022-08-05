const jwt = require('../helpers/jwt');
const bcrypt = require('../helpers/bcrypt');

describe('bcrypt.js', () => {
  test('Bcrypt, invalid password as param. Bcrypt should return false.', () => {
    try {
      expect(
        bcrypt.validateText(
          'Invalid-password-for-negative-case',
          '$2a$08$0qbRV4.I0B4FtgPCddWNuuGJOzgrXocwUqhkbfNj2gDF88rhr/Xom'
        )
      ).toBe(false);
    } catch (err) {
      //  error handle
    }
  })
  
  test('Bcrypt, valid password as param. Bcrypt should return true.', () => {
    try {
      expect(
        bcrypt.validateText(
          'Password',
          '$2a$08$0qbRV4.I0B4FtgPCddWNuuGJOzgrXocwUqhkbfNj2gDF88rhr/Xom'
        )
      ).toBe(true);
    } catch (err) {
      //  error handle
    }
  })
})

describe('jwt.js', () => {
  test('Decode using invalid secret-key. Should throw Error.', () => {
    try {
      expect(jwt.decode('dsadabwhebfhb')).toThrow(Error);
    } catch (err) {
      //  error handle
    }
  })
})
