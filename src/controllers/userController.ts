import { Request, Response } from 'express';
import User from '../models/User';

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id, '-password');
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};
