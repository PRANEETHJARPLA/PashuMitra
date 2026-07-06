const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const upload = require('../middleware/upload');
const {
  createAnimal,
  getAnimals,
  getMyAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} = require('../controllers/animalController');

router.post('/', protect, upload.single('photo'), createAnimal);
router.get('/', getAnimals);
router.get('/mine', protect, getMyAnimals);
router.get('/:id', getAnimalById);
router.put('/:id', protect, upload.single('photo'), updateAnimal);
router.delete('/:id', protect, deleteAnimal);

module.exports = router;
