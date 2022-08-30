import Section from "./Section";
import { useState } from "react";
import { Collapse, List } from "@mui/material";
import WorkspaceHeader from "./WorkspaceHeader";
import { DeleteConfirm } from "../../../../shared";
import NewSectionModal from "./NewSectionModal";
import DeleteSectionModal from "./DeleteSectionModal";
import { SectionDto, WorkspaceDto } from "../../../../shared";
import NewWorkspaceModal from "./NewWorkspaceModal";
import { delete$, toastSuccess, useApi } from "../../../../shared";
import MembersDialog from "./MembersDialog";

const deleteWorkspace = (id: string) => {
  return delete$("workspace", id, true);
};

export default function Workspace({
  data,
  reload,
}: {
  reload: Function;
  data: WorkspaceDto;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false); // delete modal
  const [showEditModal, setShowEditModal] = useState(false); // delete modal
  const [selected, setSelected] = useState<WorkspaceDto | null>(null); // selected workspace
  const [selectedSection, setSelectedSection] = useState<SectionDto | null>(
    null
  ); // selected workspace
  const [showSectionModal, setShowSectionModal] = useState(false); // section modal
  const [showDeleteSectionModal, setShowDeleteSectionModal] = useState(false); //delete section modal

  const [showMembers, setShowMembers] = useState(false);

  const onDeleteWorkspaceIsClicked = (w: WorkspaceDto) => {
    setSelected(w);
    setShowModal(true);
  };

  const onEdit = (w: WorkspaceDto) => {
    setSelected(w);
    setShowEditModal(true);
  };
  const onDeleteSection = (s: SectionDto) => {
    setSelectedSection(s);
    setShowDeleteSectionModal(true);
  };

  const onAddSection = () => {
    setShowSectionModal(true);
  };

  const onAddMembers = () => {
    setShowMembers(true);
  };

  const [deleteWS] = useApi(
    deleteWorkspace,
    {},
    {
      onSuccess: () => {
        toastSuccess("Workspace deleted Successfully!");
        setShowModal(false);
      },
    }
  );
  const onDelete = () => {
    deleteWS(selected?._id);
  };

  return (
    <>
      <WorkspaceHeader
        open={open}
        onClick={() => {
          setOpen(!open);
        }}
        workspace={data}
        onDelete={onDeleteWorkspaceIsClicked}
        onEdit={onEdit}
        onAddSection={onAddSection}
        onAddMembers={onAddMembers}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {data.sections.length > 0 ? (
            data.sections.map((i: SectionDto, index) => {
              return (
                <Section key={index} section={i} onDelete={onDeleteSection} />
              );
            })
          ) : (
            <div
              className="text-center w-full hover:bg-gray-100 px-4 py-2"
              onClick={onAddSection}
            >
              <span className="w-full cursor-pointer px-4 py-2">
                <span className="text-blue-500">{` </> `}</span>
                Add Section!
              </span>
            </div>
          )}
        </List>
      </Collapse>
      <NewWorkspaceModal
        open={showEditModal}
        initialData={selected}
        onCloseModal={(data: any) => {
          if (data) reload();
          setShowEditModal(false);
        }}
      />
      <DeleteConfirm
        isOpen={showModal}
        kind="workspace"
        title={selected?.title as string}
        pending={false}
        onCancel={() => setShowModal(false)}
        onSubmit={() => {
          onDelete();
          setShowModal(false);
        }}
      />
      <NewSectionModal
        workspaceId={data._id}
        open={showSectionModal}
        onCloseModal={(data: any) => {
          if (data) reload();
          setShowSectionModal(false);
        }}
      />
      <DeleteSectionModal
        open={showDeleteSectionModal}
        onCloseModal={(data: any) => {
          if (data) reload();
          setShowDeleteSectionModal(false);
        }}
        title={selectedSection?.title}
        id={selectedSection?._id}
      />
      {showMembers && (
        <MembersDialog
          onCloseModal={() => setShowMembers(false)}
          open={showMembers}
          workspaceId={data._id}
        />
      )}
    </>
  );
}
