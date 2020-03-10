import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';

import schema from './src/schemas';
import resolvers from './src/resolvers';

let port = 3000;
const app = express();

app.use('/graphql', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    return graphqlHTTP({
        schema,
        rootValue: resolvers,
        graphiql: true,
        context: {req, res}
    })(req, res);
});

app.listen(port);

mongoose.connect('mongodb://localhost:27017/webixGraphqlDB', {useNewUrlParser: true}, (err, db) => {
    if (!err) {
        console.log('Mongo connected');
    }
});
