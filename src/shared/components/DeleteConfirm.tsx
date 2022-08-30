import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

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

export function DeleteConfirm({
  isOpen = false,
  pending = false,
  onSubmit,
  onCancel,
  kind = "",
  title = "",
}: {
  isOpen: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  pending: boolean;
  kind: string;
  title: string;
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure to delete {kind}{" "}
        <span className="text-xl font-bold">{title}</span>?
      </DialogTitle>
      <DialogActions sx={{ paddingBottom: "16px", paddingRight: "16px" }}>
        <ThemeProvider theme={theme}>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={onCancel}
          >
            Close
          </Button>
          <Button
            color="error"
            size="small"
            variant="contained"
            onClick={onSubmit}
          >
            Delete
          </Button>
        </ThemeProvider>
      </DialogActions>
    </Dialog>
  );
}
