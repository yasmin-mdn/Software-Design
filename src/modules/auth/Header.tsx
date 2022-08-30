import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  return (
    <header className="absolute top-0 right-0 flex justify-end">
      <div
        onClick={() => history.push("/about-us")}
        className="my-3 mr-3 cursor-pointer scale-105 hover:text-[#3498db] transition-all"
      >
        about us
      </div>
    </header>
  );
}
