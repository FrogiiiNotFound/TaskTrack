import { body } from 'express-validator';

export const loginValidationRules = [
  body('email').isEmail().withMessage('Wrong email').normalizeEmail(),
  body('password')
    .isString().withMessage("Password must be a string")
    .isLength({ min: 6, max: 20 })
    .withMessage('The password must be 6-20 characters')
    .trim(),
];
