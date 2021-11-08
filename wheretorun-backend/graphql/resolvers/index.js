

const userResolver = require('./user');
const organizerResolver = require('./organizer');
// const eventsResolver = require('./events');
// const bookingResolver = require('./booking');

const rootResolver = {
  ...userResolver,
  ...organizerResolver,

//   ...eventsResolver,
//   ...bookingResolver
};

module.exports = rootResolver;