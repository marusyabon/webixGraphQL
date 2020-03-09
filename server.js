import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
const path = require('path');

import schema from './src/schemas';
import resolvers from './src/resolvers';

let port = 3000;
const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(port);

mongoose.connect('mongodb://localhost:27017/webixGraphqlDB', { useNewUrlParser: true }, function (err, db) {
	if(!err) {
		console.log('Mongo connected');
	}
});