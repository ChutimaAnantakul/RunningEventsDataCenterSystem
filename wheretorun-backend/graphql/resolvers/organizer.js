const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Organizer = require("../../models/organizer");

module.exports = {

    createOrganizer: async args => {
        try {
          const existingOrganizer = await Organizer.findOne({ email: args.organizerInput.email });
          if (existingOrganizer) {
            throw new Error('Orgenizer exists already.');
          }
          const hashedPassword = await bcrypt.hash(args.organizerInput.password, 12);
    
          const organizer = new Organizer({
            name: args.organizerInput.name,
            email: args.organizerInput.email,
            password: hashedPassword,
            idcard: args.organizerInput.idcard,
            phone: args.organizerInput.phone,
            // brithday:new Date().toISOString(),
            brithday: args.organizerInput.brithday,
            gender: args.organizerInput.gender,
            // image: args.userInput.image,
          });
    
          const result = await organizer.save();
    
          return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
          throw err;
        }
      },

      loginOrg: async ({ email, password }) => {
        const organizer = await Organizer.findOne({ email:email});
        if(!organizer){
          throw new Error('Organizer does not exist!');
        }
        const isEqual = await bcrypt.compare(password, organizer.password);
        if (!isEqual) {
          throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
          { organizerId: organizer.id, email: organizer.email },
          'somesupersecretkey',
          {
            expiresIn: '1h'
          }
        );
        return { organizerId: organizer.id, token: token, tokenExpiration: 1 };
    
      }



}