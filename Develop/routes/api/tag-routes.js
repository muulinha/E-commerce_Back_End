const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
      const tagData = await Tag.findAll({
          include: [{ model: Product, through: ProductTag, as: 'tag_of_product' }],
      });
      res.status(200).json(tagData);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});



router.get('/:id', (req, res) => {
  Tag.findOne({ where: {id: req.params.id }, include: [{model:Product, through: ProductTag, as: 'tag_of_product' }]  })
  .then((tag) => {
    return res.json(tag);
  })
  .catch((err) => {
    return res.status(400).json(err);
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});


router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  const tagData = await Tag.update(
    {
      id: req.body.id,
      tag_name: req.body.tag_name,
    },
  );
  res.json(tagData);
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
