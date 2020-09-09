const express = require('express');
const app = express();
const Fish = require('./models/fish')

app.use(express.json());

app.post('/api/v1/fish', async(req, res, next) => {
    try {
      const createdFish = await Fish.insert(req.body);
      res.send(createdFish);
    } catch(error) {
      next(error);
    }
  });
  
  app.delete('/api/v1/fish/:id', async(req, res, next) => {
    try {
      const deletedFish = await Fish.delete(req.params.id);
      res.send(deletedFish);
    } catch(error) {
      next(error);
    }
  });

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
