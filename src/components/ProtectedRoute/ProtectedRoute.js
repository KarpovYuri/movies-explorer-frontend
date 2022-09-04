import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLogged, children }) {
  return <>{isLogged ? children : <Navigate to='/' />}</>;
};

export default ProtectedRoute;
