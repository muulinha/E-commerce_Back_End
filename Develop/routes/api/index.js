const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/Categories', categoryRoutes);
router.use('/Products', productRoutes);
router.use('/Tags', tagRoutes);

module.exports = router;
