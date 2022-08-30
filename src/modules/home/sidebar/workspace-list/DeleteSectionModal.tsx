import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { delete$, toastSuccess, useApi } from "../../../../shared";
const theme = createTheme({
  palette: {
    primary: {
      main: "#d7d7d9",
    },
    error: {
      main: "#d32f2f",
    },
  },
});

const deleteSection = (id: string) => {
  return delete$("section_of_workspace?section_id=" + id, id);
};

export default function DeleteSectionModal({
  open,
  onCloseModal,
  title,
  id,
}: any) {
  const [deleteS] = useApi(
    deleteSection,
    {},
    {
      onSuccess: () => {
        toastSuccess("section deleted Successfully!");
        onCloseModal(true);
      },
    }
  );
  const onDelete = () => {
    deleteS(id);
  };

  return (
    <Dialog
      open={open}
      onClose={onCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure to delete section{" "}
        <span className="text-xl font-bold">{title}</span>?
      </DialogTitle>
      <DialogActions sx={{ paddingBottom: "16px", paddingRight: "16px" }}>
        <ThemeProvider theme={theme}>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={onCloseModal}
          >
            Close
          </Button>
          <Button
            color="error"
            size="small"
            variant="contained"
            onClick={onDelete}
          >
            Delete
          </Button>
        </ThemeProvider>
      </DialogActions>
    </Dialog>
  );
}
