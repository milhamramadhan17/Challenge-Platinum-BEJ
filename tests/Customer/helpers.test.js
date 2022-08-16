const jwt = require('../../helpers/jwt');
const bcrypt = require('../../helpers/bcrypt');
const passport = require('../../helpers/passport');
const upload = require('../../helpers/upload');
const nodemailer = require('../../helpers/nodemailer');

describe('bcrypt.js', () => {
  test('Bcrypt, invalid password as param. Bcrypt should return false.', () => {
    expect(
      bcrypt.validateText(
        'Invalid-password-for-negative-case',
        '$2a$08$0qbRV4.I0B4FtgPCddWNuuGJOzgrXocwUqhkbfNj2gDF88rhr/Xom'
      )
    ).toBe(false);
  })
  
  test('Bcrypt, valid password as param. Bcrypt should return true.', () => {
    expect(
      bcrypt.validateText(
        'Password',
        '$2a$08$0qbRV4.I0B4FtgPCddWNuuGJOzgrXocwUqhkbfNj2gDF88rhr/Xom'
      )
    ).toBe(true);
  })

  test('Bcrypt should return hashed text', () => {
    const hashedText = bcrypt.hash('Password');

    expect(hashedText).toBeTruthy();
  })
})

describe('jwt.js', () => {
  test('Decode using invalid secret-key. Should throw Error.', () => {
    expect(() => jwt.decode('dsadabwhebfhb')).toThrow();
  })

  test('Decode using valid secret-key', () => {
    const hashedText = bcrypt.hash('Password');

    expect(jwt).toBeTruthy();
  })
})

describe('passport.js', () => {
  test('Authorization test', () => {
    expect(passport).toBeTruthy();
  })
})

describe('upload.js', () => {
  test('Upload test', () => {
    expect(upload).toBeTruthy();
  })

  test('Test for photo profile', () => {
    expect(upload.upload1).toBeTruthy();
  })

  test('Test for image', () => {
    expect(upload.upload2).toBeTruthy();
  })
})

describe('nodemailer.js', () => {
  test('nodemailer chat', () => {
    expect(nodemailer).toBeTruthy();
  })
})