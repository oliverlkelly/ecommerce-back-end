const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  }).then(cdata => res.json(cdata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  }).then(cdata => {
      if(!cdata){
        res.status(404).json({message: 'This id does not match any categories.'});
        return;
      }else{
        res.json(cdata);
      }
  }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      }
    )
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(cdata => res.json(cdata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(cdata => {
      if(!cdata){
        res.status(404).json({message: 'This id does not match any categories.'});
        return;
      }else{
        res.json(cdata);
      }
  }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      }
    )
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(cdata => {
      if(!cdata){
        res.status(404).json({message: 'This id does not match any categories.'});
        return;
      }else{
        res.json(cdata);
      }
  }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      }
    )
});

module.exports = router;
