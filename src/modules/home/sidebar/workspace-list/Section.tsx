import { useHistory } from "react-router-dom";
import { SectionDto } from "../../../../shared";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Section({
  section,
  onDelete,
}: {
  section: SectionDto;
  onDelete: Function;
}) {
  const hist = useHistory();
  return (
    <div
      onClick={() => hist.push("/home/" + section._id)}
      className="w-full flex justify-between items-center cursor-pointer bg-gray-100 p-4 py-2 hover:bg-blue-100"
    >
      <span>{section.title}</span>
      <DeleteOutlineIcon
        fontSize="small"
        className="flex items-center justify-end hover:scale-125 text-red-600 group-hover:opacity-100 scale-115"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(section);
        }}
      />
    </div>
  );
}
