import { useState } from "react";
import CardStatus from "./CardStatus";
import { CardDto } from "../../../shared";
import { DeleteConfirm } from "../../../shared";
import {
  TableCell,
  TableRow,
  ThemeProvider,
  MenuItem,
  Menu,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LabelIcon from "@mui/icons-material/Label";
import CommentIcon from "@mui/icons-material/Comment";
import LabelModal from "./LabelModal";
import CommentModal from "./comment/CommentModal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#06b6d4",
    },
    error: {
      main: "#d32f2f",
    },
  },
});

export default function Card({
  card,
  color,
  onStatusChange,
  onDeleteCard,
  onEditCard,
  onMoveCard,
  onAssignment,
  onUnAssignment,
}: {
  card: CardDto;
  color?: string;
  onStatusChange: Function;
  onDeleteCard: Function;
  onEditCard: Function;
  onMoveCard: Function;
  onAssignment: Function;
  onUnAssignment: Function;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <TableRow
        key={card.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
        className="hover:bg-gray-100"
      >
        <TableCell sx={{ zIndex: "10" }}>
          <CardStatus
            color={color}
            onStatusChange={(status: string) => onStatusChange(status, card.id)}
          />
        </TableCell>
        <TableCell align="left">{card.title}</TableCell>
        <TableCell align="left">
          {" "}
          {(card.description && card.description.length > 25
            ? card.description.slice(0, 25) + "..."
            : card.description) ?? "-"}
        </TableCell>
        <TableCell align="left">-</TableCell>
        <ThemeProvider theme={theme}>
          <TableCell sx={{ width: "5px" }} align="center">
            <div
              onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreVertIcon className="cursor-pointer hover:bg-gray-200 rounded-full" />
            </div>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => onEditCard(card)}>
                <EditIcon fontSize="small" className="mr-2" color="primary" />{" "}
                Edit
              </MenuItem>
              <MenuItem onClick={() => onMoveCard(card)}>
                <DriveFileMoveIcon
                  className="mr-2"
                  color="secondary"
                  fontSize="small"
                />
                Move
              </MenuItem>
              <MenuItem onClick={() => onAssignment(card)}>
                <AssignmentIndIcon
                  className="mr-2"
                  color="warning"
                  fontSize="small"
                />
                Assign
              </MenuItem>
              <MenuItem onClick={() => onUnAssignment(card)}>
                <AssignmentIndIcon
                  className="mr-2"
                  color="warning"
                  fontSize="small"
                />
                Remove Assignee
              </MenuItem>
              <MenuItem onClick={() => setShowLabelModal(true)}>
                <LabelIcon className="mr-2" color="success" fontSize="small" />
                Set Labels
              </MenuItem>
              <MenuItem onClick={() => setShowCommentModal(true)}>
                <CommentIcon className="mr-2" color="info" fontSize="small" />
                Comments
              </MenuItem>
              <MenuItem onClick={() => setShowDeleteModal(true)}>
                <DeleteOutlineIcon
                  className="mr-2"
                  color="error"
                  fontSize="small"
                />
                Delete
              </MenuItem>
            </Menu>
          </TableCell>
        </ThemeProvider>
      </TableRow>
      {showLabelModal && (
        <LabelModal
          open={showLabelModal}
          onCloseModal={() => setShowLabelModal(false)}
          card={card}
        />
      )}
      {showCommentModal && (
        <CommentModal
          open={showCommentModal}
          onCloseModal={() => setShowCommentModal(false)}
          card={card}
        />
      )}
      <DeleteConfirm
        isOpen={showDeleteModal}
        kind="card"
        title={card.title}
        pending={false}
        onCancel={() => {
          setShowDeleteModal(false);
        }}
        onSubmit={() => {
          onDeleteCard(card.id);
          setShowDeleteModal(false);
        }}
      />
    </>
  );
}
