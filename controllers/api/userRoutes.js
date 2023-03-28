const router = require('express').Router();
const { User, ChatMessage} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/chat', withAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const user = await User.findByPk(user_id); // find the user by their ID
    const username = user.name

    const { message } = req.body; 
    const newChatMessage = { message, user_id: req.session.user_id, username: username };

    const createdChatMessage = await ChatMessage.create(newChatMessage);
    
    console.log(createdChatMessage);
    return res.status(201).json(createdChatMessage)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
