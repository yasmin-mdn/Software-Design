export default function CardStatus({ color, onStatusChange }: any) {
  return (
    <div className="cursor-pointer bg-transparent dropdown dropdown-right">
      <div tabIndex={0} className={`w-6 h-6 ${color ?? ""} rounded-md`}></div>
      <ul
        tabIndex={0}
        className="dropdown-content menu ml-1 p-1 shadow bg-gray-50 rounded-sm w-28"
      >
        {color !== "card-in-progress" && (
          <li
            onClick={() => onStatusChange("In Progress")}
            className="p-1 text-blue-400"
          >
            In Progress
          </li>
        )}
        {color !== "card-complete" && (
          <li
            onClick={() => onStatusChange("Complete")}
            className="p-1 text-green-400"
          >
            Complete
          </li>
        )}
        {color !== "card-open" && (
          <li
            onClick={() => onStatusChange("Open")}
            className="p-1 text-gray-400"
          >
            Open
          </li>
        )}
        {color !== "card-in-review" && (
          <li
            onClick={() => onStatusChange("In Review")}
            className="p-1 text-orange-400"
          >
            In Review
          </li>
        )}
      </ul>
    </div>
  );
}
