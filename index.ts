import * as express from 'express';
import * as cors from "cors"
import { config } from './config'
import { api } from './routes/api'

const app = express();
const port = config.PORT || '8000';

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
    return res.json({message: "server health ok"})
});
app.use('/api', api);
app.get('*', (req, res) => {
    res.json({ message: "Path Not Found"})
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`));