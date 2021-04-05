const router = require('express').Router();
const User = require('../models/User');

router.post('/api/search', async (req, res) => {
  const { type, name, city, skip } = req.body;
  if (
    (!name && !city) ||
    !['Organization', 'Developer'].includes(type) ||
    typeof type !== 'string' ||
    (name && typeof name !== 'string') ||
    (city && typeof city !== 'string') ||
    (skip !== undefined && isNaN(skip))
  ) {
    res.status(200).json({ error: 'SEARCH_CANNOT_BE_PERFORMED' });
    return;
  }

  const result = await User.find(
    {
      type,
      ...(name ? { name: { $regex: name, $options: 'i' } } : {}),
      ...(city ? { city: { $regex: city, $options: 'i' } } : {}),
    },
    ['avatar', 'city', 'name', 'created', 'rating', 'ratingRound', 'stars', 'type', 'votes'],
    {
      skip: skip || 0,
      limit: 12,
    }
  );

  res.status(200).json({ okay: result || [] });
});

module.exports = router;
