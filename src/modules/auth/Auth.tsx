import Login from "./Login";
import Header from "./Header";
import Register from "./Register";
//import ForgotPassword from "./ForgotPassword";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

export default function Auth() {
  let match = useRouteMatch();
  return (
    <div className="auth-bg w-screen h-screen flex justify-center items-center">
      <Header />
      <Switch>
        <Route path={`${match.path}/login`}>
          <Login />
        </Route>
        <Route path={`${match.path}/register`}>
          <Register />
        </Route>
        {/* <Route path={`${match.path}/forgot-password`}>
          <ForgotPassword />
        </Route> */}
        <Redirect to={`${match.path}/login`} />
      </Switch>
    </div>
  );
}
