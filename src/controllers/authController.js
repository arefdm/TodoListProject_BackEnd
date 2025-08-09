import bcrypt from 'bcrypt';
import { getUser,addUser } from '../datamodel/registerData.js';
import { config } from '../core/config/index.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required.' });
    }

    const existingUser = await getUser(email);
    if (existingUser.length>0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await addUser(email,hashedPassword);

    res.status(201).send({message:"Success! your account has been created",newUser});
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required.' });
    }

    const userResult = await getUser(email);
    if (userResult.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = userResult[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if(!config.jwtSecret.secret){
      return res.status(500).json({ error: 'JWT secret is not defined in environment variables.' });
    }

    const token = jwt.sign({userId: user.id},config.jwtSecret.secret,{ expiresIn:'1d'})
    
    res.json({token});
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};