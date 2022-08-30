import { useState } from "react";
import NewWorkspaceModal from "./NewWorkspaceModal";
import AddIcon from "@mui/icons-material/Add";

export default function NewWorkspaceHandler({ reload }: { reload: Function }) {
  const [show, setShow] = useState(false); //create modal

  return (
    <>
      <div className="w-full p-2 bg-gray-100 flex justify-center items-center">
        <button
          className="
        text-sm 
        bg-gray-200 
        px-2 py-1 
        rounded-md
        hover:bg-gray-300 
        transition-all
        "
          onClick={() => setShow(!show)}
        >
          <AddIcon fontSize="small" />
          New Workspace
        </button>
      </div>
      <NewWorkspaceModal
        open={show}
        onCloseModal={(data: any) => {
          if (data) reload();
          setShow(false);
        }}
      />
    </>
  );
}
