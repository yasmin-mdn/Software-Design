import { ReactComponent as SpaceLogo } from "../../../assets/space.svg";
export default function Logo() {
  return (
    <div className="p-3 pt-4 pl-28 flex flex-row text-xs text-center">
      <div className="space-logo w-1/3">
        <SpaceLogo />
      </div>
      <div className="flex text-center justify-start align-center w-2/3 font-bold text-3xl m-auto">
        Planizer
      </div>
    </div>
  );
}
