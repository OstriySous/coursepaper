var express = require('express');
var router = express.Router();
var wagnerFischer = require('./script').wagnerFischer;

// Основной маршрут
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wagner Fischer' });
});

// Добавьте новый маршрут для POST запросов
router.post('/wagner-fischer', function(req, res, next) {
  const { s1, s2 } = req.body;
  if (!s1 || !s2) {
    return res.status(400).json({ error: 'Both strings are required' });
  }
  const result = wagnerFischer(s1, s2);
  res.json({ distance: result });
});

module.exports = router;
