// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   console.log("Ola");

//   return response.write("oi");
// });

// server.listen(3333);

// localhost:3333
// package.json -> npm init -y ("type": "module",) padrão de importação ECMAscript modules
// node --watch --no-warnings server.js (--watch atualização automatica) -> script inserido em package -> npm run dev
// quando se usa o type module é necessesário passar a extensão do arquivo

import { fastify } from "fastify";
// import { DataBaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgres();

// Request Body (Corpo da requisiçãop: post, put)

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title, //title: title,
    description, //description: description,
    duration, //duration: duration,
  });

  return reply.status(201).send();
});

server.get("/videos", async (request) => {
  const search = request.query.search;

  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", async (request, reply) => {
  // :id é um espaço reservado para um parâmetro dinâmico.
  // Quando você tem uma rota com parâmetros dinâmicos como :id, você pode acessar esses valores através do objeto params do objeto request.
  // Route Parameter (PUT http://localhost:3333/videos/id)
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  // Route Parameter (DELETE http://localhost:3333/videos/id)
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
