const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} = require('../controllers/animalController');

router.post('/', protect, createAnimal);
router.get('/', getAnimals);
router.get('/:id', getAnimalById);
router.put('/:id', protect, updateAnimal);
router.delete('/:id', protect, deleteAnimal);

module.exports = router;
