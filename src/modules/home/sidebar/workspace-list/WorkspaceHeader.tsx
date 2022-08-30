import { WorkspaceDto } from "../../../../shared";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";
import { Tooltip } from "@mui/material";

export default function WorkspaceHeader({
  workspace,
  onDelete,
  onEdit,
  onAddSection,
  onAddMembers,
  onClick,
  open,
}: {
  workspace: WorkspaceDto;
  onDelete: Function;
  onEdit: Function;
  onAddSection: Function;
  onAddMembers: Function;
  onClick: Function;
  open: boolean;
}) {
  return (
    <li
      //   onClick={() => hist.push("/home/" + i._id)}
      onClick={() => onClick()}
      key={workspace._id}
      className="
            w-100
            p-1 
            px-2 
            cursor-pointer 
            hover:bg-gray-50
            flex items-center 
            justify-between
            align-center
            group
            "
    >
      <h1 className="flex items-center py-2">
        <div className="inline-block w-5 h-5 mx-2 bg-cyan-400 rounded-md"></div>
        {workspace.title}
      </h1>
      <div className="flex justify-end align-center py-2">
        <span>
          <Tooltip title="Delete Workspace">
            <DeleteOutlineIcon
              onClick={(e) => {
                e.stopPropagation();
                onDelete(workspace);
              }}
              fontSize="small"
              className="hover:scale-125 text-red-600 opacity-0 group-hover:opacity-100 scale-115"
            />
          </Tooltip>
        </span>
        <span className="w-2"></span>
        <span>
          <Tooltip title="Edit Workspace">
            <EditIcon
              onClick={(e) => {
                e.stopPropagation();
                onEdit(workspace);
              }}
              fontSize="small"
              className="hover:scale-125 opacity-0 group-hover:opacity-100 scale-115"
            />
          </Tooltip>
        </span>
        <span className="w-2"></span>
        <span>
          <Tooltip title="New Section">
            <AddIcon
              onClick={(e) => {
                e.stopPropagation();
                onAddSection();
              }}
              fontSize="small"
              className="hover:scale-125 opacity-0 group-hover:opacity-100 scale-115"
            />
          </Tooltip>
        </span>
        <span className="w-2"></span>
        <span>
          <Tooltip title="Members">
            <PersonIcon
              onClick={(e) => {
                e.stopPropagation();
                onAddMembers();
              }}
              fontSize="small"
              className="hover:scale-125 opacity-0 group-hover:opacity-100 scale-115"
            />
          </Tooltip>
        </span>
        <span className="ml-6">
          {open ? (
            <ArrowForwardIosIcon fontSize="small" className="rotate-90" />
          ) : (
            <ArrowForwardIosIcon fontSize="small" />
          )}
        </span>
      </div>
    </li>
  );
}
