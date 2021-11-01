const User = require('../../models/user');

const user = async userId => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        _id: user.id,
        // createdEvents: events.bind(this, user._doc.createdEvents)
      };
    } catch (err) {
      throw err;
    }
  };

//   const users = async users => {
//     try {
//       const users = await user.find(users);
//       return users.map(user => {
//         return { ...user._doc, _id: user.id };
//       });
//     } catch (err) {
//       throw err;
//     }
//   };

  exports.user = user;
//   exports.users = users;
  
