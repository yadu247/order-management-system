import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const { token } = useSelector(state => state.auth);

  return token ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
