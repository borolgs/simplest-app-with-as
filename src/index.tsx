import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [value, setValue] = React.useState('...');
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
