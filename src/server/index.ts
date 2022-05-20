import fastify from 'fastify';

const app = fastify({ logger: false });

app.get('/proxy', async (request, reply) => {
  return { hello: 'Hello!' };
});

const start = async () => {
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
