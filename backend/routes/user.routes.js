const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Status } = require('../models');
require('dotenv').config();

const router = express.Router();

// 注册路由
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// 登录路由
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// 获取用户数据和状态更新
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const statuses = await Status.find({ userId: id }).sort({ createdAt: -1 });
    res.status(200).json({ user, statuses });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// 更新用户描述
router.put('/:id/description', async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 只有当前用户才能更新描述
    if (user._id.toString() !== req.userId) {
      return res.status(403).json({ error: 'You can only update your own profile' });
    }

    user.description = description || user.description;
    await user.save();
    res.status(200).json({ message: 'Description updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error updating description' });
  }
});

module.exports = router;
