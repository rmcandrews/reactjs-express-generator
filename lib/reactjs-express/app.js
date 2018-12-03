import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import users from './routes/users';

const app = express();

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);

http.createServer(app).listen(3000);

export default app;
