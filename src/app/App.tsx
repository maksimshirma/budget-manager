import { Router } from './router';

const App = () => {
  // TODO: implement hook to get isAuthorized value
  const isAuthorized = true;

  return <Router isAuthorized={isAuthorized} />;
};

export default App;
