import createRouter from './context';

const authRouter = createRouter()
  // .middleware()
  .query('getSession', {
    resolve: ({ ctx: user }) => {},
  });

export default authRouter;
