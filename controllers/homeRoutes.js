const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('profile')
})

module.exports = router;