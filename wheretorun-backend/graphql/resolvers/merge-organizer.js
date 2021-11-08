const Organizer = require('../../models/organizer');

const organizer = async organizerId => {
    try {
      const organizer = await Organizer.findById(organizerId);
      return {
        ...organizer._doc,
        _id: organizer.id,
    
      };
    } catch (err) {
      throw err;
    }
  };



  exports.organizer = organizer;

  
