import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({min: 6, max: 20})
      .withMessage('PassWord must be between 6 and 20 caracters! ')
  ],
  validateRequest,
  async (req:Request, res:Response) =>{
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser) {
      throw new BadRequestError('Email in use')
    }

    const user =  User.build({email, password})
    await user.save();

    // genetare jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY! // ! says that we already cheched that the enviroment secret is defined
    );

    // store jwt to session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);

  }
);

export { router as signUpRouter };