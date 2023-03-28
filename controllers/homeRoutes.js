const router = require('express').Router();
const { Post, User, Comment, ChatRoom, ChatMessage } = require('../models');
const withAuth = require('../utils/auth');

router.get('/chat', withAuth, async (req, res) => {
  
  try {
    const chatRooms = await ChatRoom.findAll({
      include: [
        {
          model: User,
          through: { attributes: [] }, // exclude join table attributes
        },
        {
          model: ChatMessage,
          include: [ User ],
        },
      ],
    });

    const user_id = req.session.user_id;
    const user = await User.findByPk(user_id); // find the user by their ID
    const username = user.name
    
    res.render('chat', { chatRooms, username
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {  
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],          
        },
      ],
      order: [['created_at', 'DESC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

 
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
  
    const { id } = req.params
    const loggedInUserId = req.session.logged_in ? req.session.user_id : null;
    
    const postData = await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [{
            model: User
          }]
        }
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      user_id: loggedInUserId
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {  
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
      order: [[ Post, 'created_at', 'DESC']], 
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {  
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
