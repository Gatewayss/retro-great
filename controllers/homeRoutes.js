const router = require('express').Router();
const { Post, User, Comment, ChatMessage } = require('../models');
const withAuth = require('../utils/auth');

router.get('/chat', withAuth, async (req, res) => {
  try {
    const chatMessages = await ChatMessage.findAll({
      include: {
        model: User,
        attributes: ['name'],
      },
    });

  const messages = chatMessages.map((chat) => chat.get({ plain: true }));

  res.render('chat', { messages });

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
          attributes: ['name', 'birth_date', 'age'],          
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

router.get('/edit/:id', async (req, res) => {
  try {
    const editData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const edit = editData.get({ plain: true });

    res.render('edit', {
      ...edit,
      logged_in: req.session.logged_in
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

router.get('/filter1', async (req, res) => {
  try {  
    const postData = await Post.findAll({ 
     
      include: [
        {
          model: User,
          attributes: ['name', 'birth_date', 'age' ],    
          where: {
            age: {
              [Op.between]: [45, 50]
    
            }
          },      
          
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


router.get('/filter2', async (req, res) => {
  try {  
    const postData = await Post.findAll({ 
     
      include: [
        {
          model: User,
          attributes: ['name', 'birth_date', 'age' ],    
          where: {
            age: {
              [Op.between]: [45, 55]
    
            }
          },      
          
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

router.get('/filter3', async (req, res) => {
  try {  
    const postData = await Post.findAll({ 
     
      include: [
        {
          model: User,
          attributes: ['name', 'birth_date', 'age' ],    
          where: {
            age: {
              [Op.between]: [45, 60]
    
            }
          },      
          
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


router.get('/filter4', async (req, res) => {
  try {  
    const postData = await Post.findAll({ 
     
      include: [
        {
          model: User,
          attributes: ['name', 'birth_date', 'age' ],    
          where: {
            age: {
              [Op.between]: [50, 55]
    
            }
          },      
          
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

router.get('/filter5', async (req, res) => {
  try {  
    const postData = await Post.findAll({ 
     
      include: [
        {
          model: User,
          attributes: ['name', 'birth_date', 'age' ],    
          where: {
            age: {
              [Op.between]: [50, 60]
    
            }
          },      
          
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

router.get('/filter6', async (req, res) => {
  try {  
    const postData = await Post.findAll({ 
     
      include: [
        {
          model: User,
          attributes: ['name', 'birth_date', 'age' ],    
          where: {
            age: {
              [Op.between]: [55, 60]
    
            }
          },      
          
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

module.exports = router;
