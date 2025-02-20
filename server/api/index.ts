import express from 'express';
import bodyParser from 'body-parser';
import { addUser } from '../functions/index.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Express running');
});

app.post('/api/list/share', async (req, res) => {
	const data = await addUser(req.body.dragList);
	res.send(data);
});

app.listen(port, () => {
	console.log('Server listening on port', port);
});
