// import { RemoteComponent } from './remote-component';

import { RemoteComponent } from './components/remote-component';
import { config } from './config';

export const App = () => {
  return (
    <div className="App">
      <h1>Host app</h1>
      <p>Hello!</p>
      <h1>Remote apps</h1>
      <RemoteComponent remote="remote1" />
    </div>
  );
};
