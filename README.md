# nextjs_fastify_boilerplate

Integrate [NextJS](https://nextjs.org/), [fastify](fastify), [Emotion](https://emotion.sh/) and other basic configurations.

## What it has

-   Use fastify as custom server in NextJS.
-   Platform routing instead of file system routing, it only works with custom server.
-   Use emotion as css-in-js framework, it support both client and server side.
-   Basic setup of Prometheus metrics.

## How to run it

Execute `yarn ci` to install packages and make lerna scoped packages work.

### Local environment
If you want to have SSL in local, please generate certification by yourself and put cert.pem and key.pem in folder `src/packages/server/certs`. <br/>
You can refer and change the code here https://github.com/timoyan/nextjs_fastify_boilerplate/blob/master/src/packages/server/index.ts#L19 

#### APP

-   Dev mode

```shell
yarn app-dev
```

-   Normal start

```shell
yarn app-start
```

#### Server

-   Dev mode

```shell
yarn server-dev
```

-   Normal start

```shell
yarn server-start
```

### Docker

-   Build app and server

```shell
yarn build
```

-   Build docker image

```shell
docker build .
```

-   Run docker image as container

```shell
docker run -d -p 3000:80 -e PORT=80 [DOCKER_IMAGE]
```

### Debug in vscode

It only works in server code now.

-   Give `Command + Shift + P`
-   Choose `Debug: Select and Start Debugging`
-   Choose `Next: full`

Chrome should be opened and will refresh once nodeJS setup is ready.

## TODO

-   Add jest
