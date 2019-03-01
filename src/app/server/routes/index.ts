
export const routes = express.Router();

routes.get('/', (req, res) => res.send({ hello: 'world' }));
routes.get('/home', (req, res) => res.send(['love', 'love', 'love']));
routes.post('/home', (req, res) => res.send({ body: req.body }));