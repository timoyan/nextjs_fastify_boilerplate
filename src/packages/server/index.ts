require('dotenv').config();

import { fastify } from 'fastify';
import Next from 'next';
import Prometheus from 'prom-client';
import { parse } from 'url';
import { httpRequestDurationSeconds, isMobile } from './utils';

const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT || '443', 10);
const isLocal = process.env.ENV === 'local';
const address = process.env.ADDRESS || '0.0.0.0';
const metricsInterval = Prometheus.collectDefaultMetrics();

let fastifyServer: ReturnType<typeof fastify>;

if (isLocal) {
    fastifyServer = fastify({
        logger: true,
        https: {
            key: fs.readFileSync(
                path.join(__dirname, '..', './src/packages/server/certs/key.pem')
            ),
            cert: fs.readFileSync(
                path.join(__dirname, '..', './src/packages/server/certs/cert.pem')
            ),
        },
    });
} else {
    fastifyServer = fastify({
        logger: true,
    });
}

fastifyServer.register((instance, opts, nextFunc) => {
    const nextApp = Next({
        dev: isLocal,
        dir: isLocal ? '../app' : undefined,
        conf: {
            useFileSystemPublicRoutes: false,
            distDir: 'app-dist',
            serverRuntimeConfig: {
                basePath: process.env.BASE_PATH || '123',
            },
        },
    });

    const nextAppHandler = nextApp.getRequestHandler();

    nextApp
        .prepare()
        .then(() => {
            instance.get('/h/liveness', (req, reply) => {
                reply.status(200).send('liveness is ok');
            });

            instance.get('/h/readiness', (req, reply) => {
                reply.status(200).send('readiness is ok');
            });

            instance.get('/metrics', (req, reply) => {
                reply.header('Content-Type', Prometheus.register.contentType);
                reply.status(200).send(Prometheus.register.metrics());
            });

            instance.get('/images/*', async (req, reply) => {
                const parsedUrl = parse(req.url || '', true);

                return nextApp
                    .serveStatic(
                        req.raw,
                        reply.raw,
                        isLocal
                            ? path.resolve(`../app/public`, `.${parsedUrl.path}`)
                            : path.resolve('./public', `.${parsedUrl.path}`)
                    )
                    .then(() => {
                        reply.sent = true;
                    });
            });

            instance.get('/a', async (req, reply) => {
                const parsedUrl = parse(req.url || '', true);
                const { query } = parsedUrl;
                const platform = isMobile(
                    req.headers['user-agent'] || '',
                    req.headers['sec-ch-ua-mobile']?.toString() || ''
                )
                    ? 'mobile'
                    : 'desktop';

                return nextApp
                    .render(req.raw, reply.raw, `/${platform}/a`, query)
                    .then(() => {
                        httpRequestDurationSeconds
                            .labels(
                                req.method,
                                '/a',
                                reply.statusCode.toString(),
                                'Server'
                            )
                            .observe(reply.getResponseTime() / 1000);

                        reply.sent = true;
                    });
            });

            instance.get('/forget_password', async (req, reply) => {
                const parsedUrl = parse(req.url || '', true);
                const { query } = parsedUrl;
                const platform = isMobile(
                    req.headers['user-agent'] || '',
                    req.headers['sec-ch-ua-mobile']?.toString() || ''
                )
                    ? 'mobile'
                    : 'desktop';

                return nextApp
                    .render(req.raw, reply.raw, `/${platform}/forget_password`, query)
                    .then(() => {
                        httpRequestDurationSeconds
                            .labels(
                                req.method,
                                '/forget_password',
                                reply.statusCode.toString(),
                                'Server'
                            )
                            .observe(reply.getResponseTime() / 1000);

                        reply.sent = true;
                    });
            });

            instance.get('/_next/*', async (req, reply) => {
                reply.statusCode = 200;

                return nextAppHandler(req.raw, reply.raw).then(() => {
                    reply.sent = true;
                });
            });

            instance.setNotFoundHandler(async (request, reply) => {
                console.log('404');
                reply.status(404).send('Page Not Found!');

                // TODO: If you want to take nextjs to handle 404 page
                // return nextApp.render404(request.raw, reply.raw).then(() => {
                //     reply.sent = true;
                // });
            });

            nextFunc();
        })
        .catch((err) => nextFunc(err));
});

fastifyServer.listen(port, address, (err, address) => {
    if (err) {
        fastifyServer.log.error(err);
        process.exit(1);
    }

    fastifyServer.log.info(`server listening on ${address}`);
});

// "fastify-plugin": "^2.3.2",
// "fastify-metrics": "^6.0.2"
