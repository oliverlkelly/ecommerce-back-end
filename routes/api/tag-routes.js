const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
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
  }).then(tdata => res.json(tdata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
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
  }).then(tdata => {
      if(!tdata){
        res.status(404).json({message: 'This id does not match any tags.'});
        return;
      }else{
        res.json(tdata);
      }
  }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      }
    );
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tdata => res.json(tdata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(tdata => {
      if(!tdata[0]){
        res.status(404).json({message: 'This id does not match any tags.'});
        return;
      }else{
        res.json(tdata);
      }
  }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      }
    );
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tdata => {
      if(!tdata){
        res.status(404).json({message: 'This id does not match any tags.'});
        return;
      }else{
        res.json(tdata);
      }
  }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      }
    );
});

module.exports = router;
