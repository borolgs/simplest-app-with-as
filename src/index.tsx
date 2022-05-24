import React from 'react';
import ReactDOM from 'react-dom';

import { useStore } from 'effector-react';
import { createEvent, createStore } from 'effector-logger';

export const setValue = createEvent<string>();
export const $value = createStore('...').on(setValue, (_, v) => v);

function App() {
  const value = useStore($value);
  React.useEffect(() => {
    fetch('/proxy')
      .then((res) => res.json())
      .then((v) => {
        setValue(v.hello);
      });
  }, []);
  return <div className="App">{value}</div>;
}

ReactDOM.render(<App />, document.getElementById('root'));
