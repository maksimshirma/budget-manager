import { Router } from './router';
import './fonts/fontFaceObserver';
import './index.scss';

const App = () => {
  // TODO: implement hook to get isAuthorized value
  const isAuthorized = true;

  return <Router isAuthorized={isAuthorized} />;
};

export default App;
