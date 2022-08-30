import Auth from "./auth/Auth";
import Home from "./home/Home";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import AboutUs from "./defaults/AboutUs";
import { CookieHandler, LogedInState } from "../shared";
import { Redirect, Route, Switch } from "react-router-dom";

export default function Router() {
  const [logedIn, setLogedIn] = useRecoilState<boolean>(LogedInState);
  useEffect(() => {
    if (CookieHandler.getToken()) setLogedIn(true);
  }, [setLogedIn]);
  return (
    <div>
      <Switch>
        {!logedIn && (
          <Route path="/auth">
            <Auth />
          </Route>
        )}
        <Route path="/about-us">
          <AboutUs />
        </Route>
        {!logedIn && <Redirect to="/auth/login" />}
        <Route path="/home">
          <Home />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}
