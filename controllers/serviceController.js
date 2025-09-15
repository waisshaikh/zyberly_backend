import Service from '../models/Service.js';
import cloudinary from '../utils/cloudinary.js';

// Create service
export const createService = async (req, res) => {
  try {
    let iconUrl = '';

    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'zyberly/services' });
      iconUrl = result.secure_url;
    }

    const service = new Service({
      title: req.body.title,
      description: req.body.description,
      icon: iconUrl
    });

    await service.save();
    res.status(201).json(service);
  } catch (err) {
    console.error('createService error:', err);
    res.status(500).json({ message: "Failed to create service", error: err.message });
  }
};

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error('getServices error:', err);
    res.status(500).json({ message: "Failed to fetch services", error: err.message });
  }
};

// Get single service
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    console.error('getService error:', err);
    res.status(500).json({ message: "Failed to fetch service", error: err.message });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description
    };

    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'zyberly/services' });
      updateData.icon = result.secure_url;
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedService) return res.status(404).json({ message: "Service not found" });

    res.json(updatedService);
  } catch (err) {
    console.error('updateService error:', err);
    res.status(500).json({ message: "Failed to update service", error: err.message });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });

    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error('deleteService error:', err);
    res.status(500).json({ message: "Failed to delete service", error: err.message });
  }
};
