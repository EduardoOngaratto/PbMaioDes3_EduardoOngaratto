import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function checkToken(req: Request, res: Response, next: NextFunction): Response | void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado!' });
  }

  try {
    const secret = process.env.SECRET as string;
    jwt.verify(token, secret);
    return next();
  } catch (error) {
    return res.status(400).json({ msg: 'Token inválido!' });
  }
}
