const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('test')
})

module.exports = router;