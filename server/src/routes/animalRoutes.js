const express = require('express');
const router = express.Router();
const {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} = require('../controllers/animalController');

router.post('/', createAnimal);
router.get('/', getAnimals);
router.get('/:id', getAnimalById);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

module.exports = router;
