import { RecoilRoot } from "recoil";
import Router from "./modules/Router";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className="w-screen h-screen">
          <Router />
        </div>
        <ToastContainer />
      </BrowserRouter>
    </RecoilRoot>
  );
}
