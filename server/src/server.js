import express      from 'express';
import bodyParser   from 'body-parser';
import cors         from 'cors';
import path         from 'path';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}../../../client/index.html`));
});

const port = 8080;

app.listen(port, () => console.log('App listening on port: ', port));
