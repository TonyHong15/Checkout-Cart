const router = require('express').Router();
let Item = require('../dbSchemas/itemSchema');

router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/additem').post((req, res) => {
  const label = req.body.label;
  const price = req.body.price;
  const newItem = new Item({label,price});

  newItem.save()
    .then(() => res.json('Added Item'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/finditem/:id').get((req,res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/deleteitem/:id').delete((req,res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted Item'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;