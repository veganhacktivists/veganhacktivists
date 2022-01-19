import { StatusCodes } from 'http-status-codes';
import ErrorPage from '../components/layout/errorPage';

const NotFound: React.FC = () => {
  return <ErrorPage statusCode={StatusCodes.NOT_FOUND} />;
};

export default NotFound;
