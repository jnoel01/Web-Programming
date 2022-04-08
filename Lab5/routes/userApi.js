const express = require('express');
const router = express.Router();
const data = require('../data');
const workPepData = data.userApi;

router
  .route('/people')
  .get(async (req, res) => {
    try {
      const user = await workPepData.getPeople();
      return res.json(user);
    } catch (e) {
      return res.status(404).json(e);
    }
  })

router
.route('/people/:id')
.get(async (req, res) => {
try {
    const user = await workPepData.getPersonById(req.params.id);
    return res.json(user);
} catch (e) {
    return res.status(404).json(e);
}
})
.post(async (req, res) => {
res.send(`POST request to http://localhost:3000/users/${req.params.id}`);
})
.delete(async (req, res) => {
res.send(`DELETE request to http://localhost:3000/users/${req.params.id}`);
});

router
  .route('/work')
  .get(async (req, res) => {
    try {
      const user = await workPepData.getWork();
      return res.json(user);
    } catch (e) {
      return res.status(404).json(e);
    }
  })

  router
.route('/work/:id')
.get(async (req, res) => {
try {
    const user = await workPepData.getWorkById(req.params.id);
    return res.json(user);
} catch (e) {
    return res.status(404).json(e);
}
});

module.exports = router;