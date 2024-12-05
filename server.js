const fastify = require('fastify');
const app = fastify();

app.get('/', (req, res) => {
    res.code(200).send({ message: 'Hello, World!' });
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    res.code(200).send({ message: 'Hello, World!', id: id });
});

app.listen({ port: 3000 }, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running http://localhost:${3000}`);
});