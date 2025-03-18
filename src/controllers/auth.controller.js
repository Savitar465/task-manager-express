import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';

export const register = async (req, res) => {
    try {
        const {email, password, name} = req.body;

        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            return res.status(400).json({message: 'Email already registered'});
        }

        const user = await User.create({
            email,
            password,
            name,
        });

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET || 'your-secret-key',
            {expiresIn: '1d'}
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        res.status(500).json({message: 'Error registering user', error: error.message});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET || 'your-secret-key',
            {expiresIn: '1d'}
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        res.status(500).json({message: 'Error logging in', error: error.message});
    }
};

export const getMyInfo = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findByPk(decoded.id);
        res.status(200).json({
            message: 'User Info',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        res.status(500).json({message: 'Error fetching user', error: error.message});
    }
}

export const verifyToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(200).json({ message: 'Token is valid', user: decoded });
    });
};