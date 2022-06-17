const { Router } = require('express');
const router = Router();
const productos = require('./productos');

router.get('/home', (req, res) => {
    res.send('Estas en home ')
})

router.use('/productos', productos);

module.exports = router;
