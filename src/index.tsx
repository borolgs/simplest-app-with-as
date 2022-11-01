import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';

const Router = BrowserRouter as any;

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/other/page">Other</Link>
    </div>
  );
}

function Other() {
  return (
    <div>
      <h2>Other</h2>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/other/page" render={(props) => <Other />} />
          <Route path="/" exact={true} render={() => <Home />} />
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
