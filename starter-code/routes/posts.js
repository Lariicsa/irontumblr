const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Post = require('../models/Post');
const User = require('../models/User');
const uploadCloud = require('../config/cloudinary')

router.get('/posts/add', async (req,res) => {
	// const creators = await User.find()
	// console.log('creators', {creators})
	console.log(req.session.currentUser)
	res.render('posts/add')
})

router.post('/posts/add', uploadCloud.single('picture'), async(req, res) => {
	let { title, content } = req.body
	const creator = req.session.currentUser
	const { url: picPath, originalname: picName } = req.file
	await Post.create({ title, content, creator, picPath, picName } )
  res.redirect('/')
})



module.exports = router