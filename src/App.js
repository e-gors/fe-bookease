import { Route, Router as BrowserRouter, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import routes from "./routes/routes";
import Private from "./routes/Private";
import Public from "./routes/Public";
import NotFound from "./routes/NotFound";

function App() {
  return (
    <BrowserRouter history={createBrowserHistory()}>
      <Switch>
        {routes.map((route, index) => {
          if (route.auth) {
            return <Private exact key={index} {...route} />;
          } else {
            return <Public exact key={index} {...route} />;
          }
        })}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
