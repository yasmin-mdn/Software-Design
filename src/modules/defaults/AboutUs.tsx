import { useHistory } from "react-router-dom";

export default function AboutUs() {
  const history = useHistory();
  return (
    <div>
      <div className="auth-bg hero min-h-screen">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-2xl font-semibold">
              Welcome to <br />
              <span className="text-5xl font-bold">Planizer</span>
            </h1>{" "}
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              praesentium, repudiandae corrupti quo recusandae adipisci?
              Reprehenderit, quos cupiditate blanditiis officiis inventore illum
              voluptatem deleniti voluptas quia id quod, praesentium corporis?
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                history.push("/");
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
