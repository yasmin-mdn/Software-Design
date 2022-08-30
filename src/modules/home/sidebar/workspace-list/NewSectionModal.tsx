import { useState } from "react";
import { Dialog, Button } from "@mui/material";
import { GrClose } from "react-icons/gr";
import SectionKind from "./SectionKind";
import { post$, toastSuccess, useApi, SectionDto } from "../../../../shared";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#22D3EE",
    },
  },
});

const createSection = (data: SectionDto) => {
  return post$("section_of_workspace", data);
};

export default function NewSectionModal({
  workspaceId,
  open,
  onCloseModal,
}: any) {
  const [title, setTitle] = useState<string | null>("");
  const [createS, , pending_on_create] = useApi(
    createSection,
    {},
    {
      onSuccess: () => {
        toastSuccess("Section created Successfully!");
        onCloseModal(true);
      },
    }
  );

  const submit = () => {
    createS({
      title,
      workspaceId,
    });
  };

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
        <h1 className="font-bold">New Section</h1>
      </div>
      {/* SectionKind type */}
      <SectionKind title={title} setTitle={setTitle} />
      {/* confirmation */}
      <div className="w-full flex justify-end p-6">
        <ThemeProvider theme={theme}>
          <Button
            color="primary"
            variant="contained"
            disabled={pending_on_create || !title}
            onClick={submit}
          >
            Create
          </Button>
        </ThemeProvider>
      </div>
    </Dialog>
  );
}
