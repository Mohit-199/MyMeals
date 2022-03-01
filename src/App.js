import { useContext,Fragment } from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import OrderSummary from "./pages/OrderSummary";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./store/auth-context";
function App() {

  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <Switch>
        <Route path="/ordersummary" exact>
          <OrderSummary/>
        </Route>
        <Route path="/login" exact>
          <AuthPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Fragment>
    
  );
}

export default App;
