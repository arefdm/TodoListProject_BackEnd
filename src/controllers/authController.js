import bcrypt from 'bcrypt';
import { getUser,addUser } from '../datamodel/registerData.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required.' });
    }

    const existingUser = await getUser(email);
    if (existingUser.length>0) {
        console.log('1233333');
      return res.status(400).json({ error: 'User already exists' });
    }
    console.log('22222222');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('users:'+ email,hashedPassword);
    const newUser = await addUser(email,hashedPassword);

    res.status(201).send(newUser);
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
    

    res.json(user);
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};