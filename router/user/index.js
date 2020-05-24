const express = require('express');
const router = express.Router();
const {filterRole} = require('../../util/token');

const register = require('./register');
const login = require('./login');
const updateUserInfoById = require('./updateUserInfoById');
const getAllUser = require('./getAllUser');
const updateRoleById = require('./updateRoleById');

//用户注册
router.post('/register',register);

//用户登录
router.post('/login', login);

//通过id修改用户信息
router.put('/updateUserInfoById/:userId', updateUserInfoById);

//获取所有用户列表
router.get('/getAllUser', filterRole('root', getAllUser));

//通过id修改用户权限
router.put('/updateRoleById/:userId', filterRole('root', updateRoleById));

module.exports = router
