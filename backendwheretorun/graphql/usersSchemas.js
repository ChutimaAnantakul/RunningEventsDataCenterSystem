var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var UserModel = require('../models/User');

var userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        idcard: {
          type: GraphQLString
        },
        phone: {
          type: GraphQLString
        },
        brithday: {
          type: GraphQLString
        },
        gender: {
          type: GraphQLString
        },
        // published_year: {
        //   type: GraphQLInt
        // },
        // publisher: {
        //   type: GraphQLString
        // },
        updated_date: {
          type: GraphQLDate
        }
      }
    }
  });

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        users: {
          type: new GraphQLList(userType),
          resolve: function () {
            const users = UserModel.find().exec()
            if (!users) {
              throw new Error('Error')
            }
            return users
          }
        },
        user: {
          type: userType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const userDetails = UserModel.findById(params.id).exec()
            if (!userDetails) {
              throw new Error('Error')
            }
            return userDetails
          }
        }
      }
    }
  });

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addUser: {
          type: userType,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            },
            idcard: {
              type: new GraphQLNonNull(GraphQLString)
            },
            phone: {
              type: new GraphQLNonNull(GraphQLString)
            },
            brithday: {
              type: new GraphQLNonNull(GraphQLString)
            },
            gender: {
              type: new GraphQLNonNull(GraphQLString)
            },
            // published_year: {
            //   type: new GraphQLNonNull(GraphQLInt)
            // },
            // publisher: {
            //   type: new GraphQLNonNull(GraphQLString)
            // }
          },
          resolve: function (root, params) {
            const userModel = new UserModel(params);
            const newUser = userModel.save();
            if (!newUser) {
              throw new Error('Error');
            }
            return newUser
          }
        },
        updateUser: {
          type: userType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            },
            idcard: {
              type: new GraphQLNonNull(GraphQLString)
            },
            phone: {
              type: new GraphQLNonNull(GraphQLString)
            },
            brithday: {
              type: new GraphQLNonNull(GraphQLString)
            },
            gender: {
              type: new GraphQLNonNull(GraphQLString)
            },
            // published_year: {
            //   type: new GraphQLNonNull(GraphQLInt)
            // },
            // publisher: {
            //   type: new GraphQLNonNull(GraphQLString)
            // }
          },
          resolve(root, params) {
            return UserModel.findByIdAndUpdate(params.id, { name: params.name, email: params.email, password: params.password, idcard: params.idcard, phone: params.phone, brithday: params.brithday, gender: params.gender, updated_date: new Date() }, function (err) {
              if (err) return next(err);
            });
          }
        },
        removeUser: {
          type: userType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const remUser = UserModel.findByIdAndRemove(params.id).exec();
            if (!remUser) {
              throw new Error('Error')
            }
            return remUser;
          }
        }
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});