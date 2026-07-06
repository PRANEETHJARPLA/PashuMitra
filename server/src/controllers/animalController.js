const Animal = require('../models/Animal');

exports.createAnimal = async (req, res) => {
  try {
    const animalData = {
      ...req.body,
      owner: req.user._id,
      sellerName: req.user.name,
      sellerContact: req.user.phone || 'Not provided',
    };

    const animal = await Animal.create(animalData);
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

exports.getMyAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    if (animal.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this listing' });
    }

    const updated = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    if (animal.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await Animal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Animal listing deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
