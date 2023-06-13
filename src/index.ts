import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express';
import { IncomingMessage } from 'http';
import { port } from './config';
import { schema } from './graphql/schema';
import { ContextInterface, UserInterface } from './interfaces';
import { Guard } from './middlewares';
import { Database } from './models/instance';
class Server {
  app: express.Application;
  constructor() {
    this.app = express();
  }

  private async connectDB() {
    await Database.connection();
  }



  public async start() {
    this.connectDB();
    this.configuration();
    const server = new ApolloServer<BaseContext>({
      schema: schema,
      introspection: true,
      csrfPrevention: true,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: this.app.get('port') },
      context: async ({ req }: { req: IncomingMessage }): Promise<ContextInterface> => {
        const token = req.headers.authorization as string;
        let user: UserInterface | undefined;
     
        if (token) {
          user = await Guard.auth(token);
        }

        return {
          user,
          token
        };
      },
    });

    console.log(`🚀  Server ready at: ${url}`);
  }

  private configuration() {
    this.app.set('port', port);
  }
}

const server = new Server();
server.start();