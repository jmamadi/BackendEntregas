const { Router } = require('express');
const router = Router();
const productos = [
    {
    'title': 'Cafe Brasilero',
    'price': 1900,
    'thumbnail': 'https://github.com/jmamadi/aplicativoreact/blob/main/appreact/public/images/bandera_2.png',
    'id': 1
    },
    {
    'title': 'Cafe Colombiano',
    'price': 1500,
    'thumbnail': 'https://github.com/jmamadi/aplicativoreact/blob/main/appreact/public/images/bandera_1.png',
    'id': 2
    },
    {
    'title': 'Cafe Hindú',
    'price': 2000,
    'thumbnail': 'https://github.com/jmamadi/aplicativoreact/blob/main/appreact/public/images/bandera_4.png',
    'id': 3
    }
   ]

router.get('/', (req, res) => {
    res.json(productos);
})

router.post('/', (req, res) => {
    const {
        title,
        price,
        thumbnail
    } = req.body
    let ultimo = productos.length - 1;
    let id = productos[ultimo].id + 1;
    productos.push({
        id,
        title,
        price,
        thumbnail
    });
    res.send(productos[ultimo + 1]);
})

router.get('/:id', (req, res) => {
    let encontrado = productos.find(producto => producto.id == req.params.id);
    let resultado;
    if (encontrado) {
        resultado = encontrado;
    } else {
        resultado = {
            error: 'El producto no fue encontrado'
        };
    }
    res.json(resultado);
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = productos.findIndex(producto => producto.id === id)
    const oldProd = productos[index]

    if (productos.find((prod) => prod.id === id)) {
      productos[index] = req.body
      productos[index].id = id

      res.json(`${JSON.stringify( oldProd )}   ha sido actualizado a:  ${JSON.stringify( productos[index] )}`);

    } else {
      res.json(`El producto con el id: ${id} no existe`);
    }
})

router.delete('/:id', (req, res) =>{
    const index = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    let resultado = '';
    if (index === -1) {
        resultado = {error: 'El producto no fue encontrado'}
    } else {
        productos.splice(index, 1);
        resultado = 'Producto eliminado con éxito'
    }
    res.json(resultado);
})

module.exports = router;