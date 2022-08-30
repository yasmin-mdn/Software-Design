import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import WorkspaceMain from "../workspace/WorkspaceMain";
import Dashboard from "./Dashboard";
import Sidebar from "./sidebar/Sidebar";
import { CookieHandler } from "../../shared";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Home() {
  const match = useRouteMatch();
  const hist = useHistory();

  const logout = () => {
    CookieHandler.removeToken();
    window.location.reload();
  };

  return (
    <div className="w-screen h-screen bg-gray-200 flex">
      {/*sidenav*/}
      <Sidebar />
      <div className="flex-1 overflow-y-scroll">
        <header className="bg-white flex justify-between items-center text-xl p-7 sticky top-0">
          <ul className="flex">
            <li
              className="flex items-center cursor-pointer hover:text-cyan-600 transition-all"
              onClick={() => hist.push("/home/dashboard")}
            >
              <HomeIcon className="mr-2" />
              Home
            </li>
            <li className="w-4"></li>
            <li
              className="flex items-center cursor-pointer hover:text-cyan-600 transition-all"
              onClick={() => hist.push("/about-us")}
            >
              <InfoIcon className="mx-2" />
              About Us
            </li>
          </ul>
          <ul>
            <li>
              <button
                className="hover:text-red-600 flex flex-nowrap items-center justify-center "
                onClick={logout}
              >
                <LogoutIcon />
                <span className="px-2">Logout</span>
              </button>
            </li>
          </ul>
        </header>
        <Switch>
          <Route path={`${match.path}/dashboard`}>
            <Dashboard />
          </Route>
          <Route path={`${match.path}/:id`}>
            <WorkspaceMain />
          </Route>
          <Redirect to={`${match.path}/dashboard`} />
        </Switch>
      </div>
    </div>
  );
}
