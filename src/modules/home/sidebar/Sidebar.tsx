import Logo from "./Logo";
import WorkspaceLayout from "./workspace-list/WorkspaceLayout";

export default function Sidebar() {
  return (
    <div className="w-1/4 min-w-[300px] max-w-[33 0px] h-screen  bg-white border-r-[1px] border-r-gray-200 flex flex-col justify-between">
      {/* Main Logo */}
      <div>
        <Logo />
        <hr />
        {/*search*/}
        {/* <SearchBox /> */}
        {/* <hr /> */}
        <WorkspaceLayout />
        <hr />
      </div>
      {/* <ProfileInSidebar /> */}
    </div>
  );
}
