import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem vindo' });
});

app.use('/api/users', userRoutes);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

if (!dbUser || !dbPassword) {
  console.error('Database credentials are missing in the .env file.');
  process.exit(1);
}

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.9u8vn7c.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar com o MongoDB:', err.message);
  });
