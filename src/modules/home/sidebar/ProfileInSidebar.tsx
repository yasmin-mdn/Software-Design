export default function ProfileInSidebar() {
  return (
    <div className="mt-auto sticky bottom-0 h-20 w-full bg-white">
      <hr />
      <div className="flex flex-nowrap">
        <div className="w-14 h-14 m-2 avatar online">
          <div className="w-24 rounded-full">
            <img
              src="https://api.lorem.space/image/face?hash=28212"
              alt="profile.png"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span>John Doe</span>
          <span className="text-gray-600 text-sm">@john.doe.1-1-7</span>
        </div>
      </div>
    </div>
  );
}
