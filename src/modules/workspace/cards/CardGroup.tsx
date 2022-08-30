import { useState } from "react";
import {
  CardDto,
  CardGroupDto,
  delete$,
  patch$,
  toastSuccess,
  useApi,
} from "../../../shared";
import Card from "./Card";
import CreateCardModal from "./CreateCardModal";
import {
  TableContainer,
  TableBody,
  TableCell,
  Table,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoveCardModal from "./MoveCardModal";
import AssignmentCardModal from './AssignCardModal';
import UnAssignmentCardModal from './UnAssignmentCardModal';
const changeCardStatus = (data: Partial<CardDto>) => {
  return patch$("card", data.id ?? "", data);
};

const deleteCard = (id: string) => {
  return delete$(`card?card_id=${id}`, id);
};

export default function CardGroup({
  group,
  sectionId,
  workspaceId,
  onReload,
}: {
  sectionId: string;
  workspaceId: string;
  group: CardGroupDto;
  onReload: Function;
}) {
  const [showNewCModal, setShowNewCModal] = useState<boolean>(false);
  const [cardForEdit, setCardForEdit] = useState<Partial<CardDto>>({
    status: group.status,
  });
  const [showMoveCardModal, setShowMoveCardModal] = useState<boolean>(false);
  const [cardForMove, setCardForMove] = useState<Partial<CardDto>>();

  const [sowAssignmentCardModal, setShowAssignmentCardModal] =
    useState<boolean>(false);
  const [cardForAssignment, setCardForAssignment] =
    useState<Partial<CardDto>>();

  const [sowUnAssignmentCardModal, setShowUnAssignmentCardModal] = useState<boolean>(false);
  const [cardForUnAssignment, setCardForUnAssignment] = useState<Partial<CardDto>>();
  const [changeCStatus] = useApi(
    changeCardStatus,
    {},
    {
      onSuccess: () => {
        toastSuccess("Status updated Successfully!");
        onReload();
      },
    }
  );
  const [deleteC] = useApi(
    deleteCard,
    {},
    {
      onSuccess: () => {
        toastSuccess("Card deleted Successfully!");
        onReload();
      },
    }
  );

  const onStatusChange = (status: string, id: string) => {
    changeCStatus({ id, status });
  };

  const onDeleteCard = (id: string) => {
    deleteC(id);
  };

  const onEditCard = (card: CardDto) => {
    setCardForEdit(card);
    setShowNewCModal(true);
  };

  const onMoveCard = (card: CardDto) => {
    setCardForMove(card);
    setShowMoveCardModal(true);
  };

  const onAssignment = (card: CardDto) => {
    setCardForAssignment(card);
    setShowAssignmentCardModal(true);
  };


  const onUnAssignment = (card: CardDto) => {
    setCardForUnAssignment(card);
    setShowUnAssignmentCardModal(true);
  };
  return (
    <div>
      {showNewCModal && (
        <CreateCardModal
          open={showNewCModal}
          initialCardData={cardForEdit}
          onCloseModal={(result: any) => {
            if (result) onReload();
            setShowNewCModal(false);
            setCardForEdit({});
          }}
          sectionId={sectionId}
        />
      )}
      {showMoveCardModal && (
        <MoveCardModal
          open={showMoveCardModal}
          cardId={cardForMove?.id}
          onCloseModal={(result: any) => {
            if (result) onReload();
            setShowMoveCardModal(false);
            setCardForMove({});
          }}
          sectionId={sectionId}
        />
      )}
      {sowAssignmentCardModal && (
        <AssignmentCardModal
          open={sowAssignmentCardModal}
          cardId={cardForAssignment?.id}
          onCloseModal={(result: any) => {
            if (result) onReload();
            setShowAssignmentCardModal(false);
            setCardForAssignment({});
          }}
          workspaceId={workspaceId}
        />
      )}

      {sowUnAssignmentCardModal && (
        <UnAssignmentCardModal
          open={sowUnAssignmentCardModal}
          cardId={cardForUnAssignment?.id}
          onCloseModal={(result: any) => {
            if (result) onReload();
            setShowUnAssignmentCardModal(false);
            setCardForUnAssignment({});
          }}
          workspaceId={workspaceId}

        />
      )}


      <div className="w-full p-2">
        <div className="m-2">
          <div className="w-full p-2 px-0">
            {/* status */}
            <span
              className={`w-20 p-2 px-4 ${
                group.color ?? ""
              } text-white rounded-tl-md rounded-tr-md`}
            >
              {group.status}
            </span>
            {/* actions */}
          </div>
          {/* list */}
          <div className="w-full h-full">
            <TableContainer
              component={Paper}
              sx={{ overflow: "hidden", width: "100%", height: "100%" }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "20px",
                        fontWeight: "bolder",
                        fontSize: "16px",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bolder",
                        fontSize: "16px",
                      }}
                      align="left"
                    >
                      Title
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bolder",
                        fontSize: "16px",
                      }}
                      align="left"
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bolder",
                        fontSize: "16px",
                      }}
                      align="left"
                    >
                      Due Date
                    </TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.cards.map((card) => (
                    <Card
                      onDeleteCard={onDeleteCard}
                      onEditCard={onEditCard}
                      onMoveCard={onMoveCard}
                      key={card.id}
                      card={card}
                      color={group.color}
                      onStatusChange={onStatusChange}
                      onAssignment={onAssignment}
                      onUnAssignment={onUnAssignment}
                    ></Card>
                  ))}
                </TableBody>
              </Table>
              <TableCell sx={{ width: "100%" }} align="left">
                <span
                  onClick={() => setShowNewCModal(true)}
                  className="mb-6 px-4 py-2 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 align-center"
                >
                  <AddIcon fontSize="small" />
                  Add Task
                </span>
              </TableCell>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
