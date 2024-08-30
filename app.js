import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import { graphqlUploadExpress } from "graphql-upload";

dotenv.config();

let io;
const _port = process.env.PORT || 4000;

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // Middleware para habilitar CORS
  app.use(cors());

  // Conneccion de Socket.IO
  io.on("connection", (socket) => {
    console.log("Nueva coneccion");

    socket.on("disconnect", () => {
      console.log("Desconectado");
    });
  });

  // API para la subida de archivos
  app.get("/", (req, res) => res.send("Bienvenido a mi API"));

  // Agregar middleware de graphql-upload para manejar subidas de archivos
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));

  // Servir carpeta con archivos estaticos
  app.use('/storage', express.static('storage'));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  await new Promise((resolve) =>
    httpServer.listen(
      {
        port: _port,
      },
      resolve
    )
  );

  console.log(
    `🚀 Server ready on Port ${_port} GraphQL at http://localhost:${_port}/graphql`
  );
}

export { io };
