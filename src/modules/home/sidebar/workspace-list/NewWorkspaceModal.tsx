import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import WorkspaceKind from "./WorkspaceKind";
import { Dialog, Button } from "@mui/material";
import {
  patch$,
  post$,
  useApi,
  WorkspaceDto,
  toastSuccess,
} from "../../../../shared";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#22D3EE",
    },
  },
});

const createWorkspace = (data: WorkspaceDto) => {
  return post$("workspace", data);
};

const updateWorkspace = (data: WorkspaceDto) => {
  return patch$("workspace", data._id, data);
};

export default function NewWorkspaceModal({
  initialData,
  open,
  onCloseModal,
}: {
  open: boolean;
  onCloseModal: Function;
  initialData?: WorkspaceDto | null;
}) {
  const [title, setTitle] = useState<string | null>(
    initialData ? initialData.title : "222"
  );
  const [type, setType] = useState<"Scrum" | "Custom">(
    initialData ? initialData.category : "Scrum"
  );
  const [link, setLink] = useState<string | null>(
    initialData && initialData.googleCalendarLink
      ? initialData.googleCalendarLink
      : ""
  );
  const [createWS, , pending_on_create] = useApi(
    createWorkspace,
    {},
    {
      onSuccess: () => {
        toastSuccess("Workspace created Successfully!");
        onCloseModal(true);
      },
    }
  );
  const [updateWS] = useApi(
    updateWorkspace,
    {},
    {
      onSuccess: () => {
        toastSuccess("Workspace updated Successfully!");
        onCloseModal(true);
      },
    }
  );

  const submit = () => {
    if (initialData && initialData._id)
      updateWS({
        ...initialData,
        title,
        type,
        link,
      });
    else {
      createWS({
        title,
        type,
        link,
      });
    }
  };

  useEffect(() => {
    setLink(
      initialData && initialData.googleCalendarLink
        ? initialData.googleCalendarLink
        : ""
    );
    setTitle(initialData && initialData.title ? initialData.title : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return (
    <Dialog open={open} fullWidth={true}>
      {/* close btn */}
      <div className="flex justify-end">
        <button
          className="relative left-0 pt-4 pr-4"
          onClick={() => onCloseModal(null)}
        >
          <GrClose />
        </button>
      </div>
      {/* header */}
      <div className="w-full pl-6 flex flex-col justify-center">
        <h1 className="font-bold">New Workspace</h1>
      </div>
      {/* workspace type */}
      <WorkspaceKind
        title={title}
        setTitle={setTitle}
        link={link}
        setLink={setLink}
        type={type}
        setType={setType}
      />
      {/* confirmation */}
      <div className="w-full flex justify-end p-6">
        <ThemeProvider theme={theme}>
          <Button
            color="primary"
            variant="contained"
            disabled={pending_on_create}
            onClick={submit}
          >
            {initialData ? "Edit" : "Create"}
          </Button>
        </ThemeProvider>
      </div>
    </Dialog>
  );
}
