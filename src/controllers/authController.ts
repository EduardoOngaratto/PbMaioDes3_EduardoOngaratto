import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { registerSchema, loginSchema } from '../validators/authValidators';

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).json({ msg: error.details.map((detail) => detail.message) });
  }

  const {
    firstName,
    lastName,
    birthDate,
    city,
    country,
    email,
    password,
  } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(422).json({ msg: 'Esse e-mail já está em uso!' });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    firstName,
    lastName,
    birthDate,
    city,
    country,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    return res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).json({ msg: error.details.map((detail) => detail.message) });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).json({ msg: 'Usuário não encontrado!' });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida!' });
  }

  try {
    const secret = process.env.SECRET as string;
    const token = jwt.sign({ id: user._id }, secret);
    return res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token });
  } catch (error) {
    return res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
  }
};
