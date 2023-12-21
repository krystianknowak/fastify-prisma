import Fastify from 'fastify';

const server = Fastify({
    logger: true
})

server.listen(
    { port: Number(process.env.PORT), host: process.env.HOST },
    (error, address) => {
        if (error) {
            server.log.error(error);
            process.exit(1);
        }
        server.log.info("Server is running");
    }
)