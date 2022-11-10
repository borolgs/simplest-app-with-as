import ReactDOM from 'react-dom';
import { App } from './app';

const Root = () => {
  return <App />;
};

export function initialize() {
  const root = document.getElementById('root');

  ReactDOM.render(<Root />, root);
}

export default Root;
