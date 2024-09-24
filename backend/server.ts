import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { Request, Response } from "express";
import http from "http";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// Example function to get the user from the authorization header
const getUserFromToken = (token: string, secret: string) => {
  try {
    const payload: any = jwt.verify(token, secret);
    return payload
  } catch (error) {
    return null;
  }
};

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async () => {
  await server.start();

  app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
  }));

  app.use(cookieParser());
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }: { req: Request; res: Response }) => {
        const token = req.cookies["access-token"];
        const user = token
          ? getUserFromToken(token, process.env.JWT_SECRET || "")
          : null;
        // if (!user) {
        //   const refreshToken = req.cookies["refresh-token"];
        //   if (refreshToken) {
        //     const newAccessToken = 
        //   }
        // }
        
        return { user, req, res };
      },
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
