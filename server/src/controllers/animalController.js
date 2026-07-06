const Animal = require('../models/Animal');

// Create a new listing
exports.createAnimal = async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all listings (with optional filters)
exports.getAnimals = async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice } = req.query;
    const filter = { status: 'Available' };

    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const animals = await Animal.find(filter).sort({ createdAt: -1 });
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single listing by ID
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a listing
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a listing
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json({ message: 'Animal listing deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
