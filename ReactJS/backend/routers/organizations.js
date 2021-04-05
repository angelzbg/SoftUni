const router = require('express').Router();
const User = require('../models/User');

router.post('/api/organizations', async (req, res) => {
  let skip = req.body.skip ?? 0;
  let limit = req.body.limit ?? 10;
  if (req.body.skip !== undefined) {
    const check = parseInt(req.body.skip);
    if (isNaN(check)) {
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
      return;
    }
  }

  if (req.body.limit !== undefined) {
    const check = parseInt(req.body.limit);
    if (isNaN(check)) {
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
      return;
    }
  }

  let created;
  if (req.body.created !== undefined) {
    created = parseInt(req.body.created);
    if (isNaN(created)) {
      created = undefined;
    }
  }

  const filter = req.body.filter ?? '';
  if (typeof filter !== 'string') {
    res.status(200).json({ error: 'UNEXPECTED_ERROR' });
    return;
  }

  const authFilters = ['new-local', 'top-local'];
  const city = req?.user?.city ?? '';
  if (!city && authFilters.includes(filter)) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  if (!['new', 'top', 'new-local', 'top-local'].includes(filter)) {
    res.status(200).json({ error: 'INVALID_FILTER' });
    return;
  }

  const sorts = {
    new: { created: -1 },
    top: { rating: -1, votes: -1 },
    'new-local': { created: -1 },
    'top-local': { rating: -1, votes: -1 },
  };

  const selected = ['avatar', 'city', 'name', 'created', 'rating', 'ratingRound', 'stars', 'type', 'votes'];

  const result = await User.find(
    {
      type: 'Organization',
      ...(city && authFilters.includes(filter) ? { city: { $regex: city, $options: 'i' } } : {}),
      ...(['new', 'new-local'].includes(filter)
        ? {
            created: {
              [req.body.isSync ? '$gt' : '$lt']: created ?? (req.body.isSync ? 0 : Number.MAX_SAFE_INTEGER),
            },
          }
        : {}),
    },
    selected,
    {
      ...(['top', 'top-local'].includes(filter) ? { skip } : {}),
      ...(req.body.isSync && ['new', 'new-local'].includes(filter) ? {} : { limit }),
      sort: sorts[filter],
    }
  );

  res.status(200).json({ okay: result ?? [] });
});

module.exports = router;
