import { useState } from "react";
import { Dialog, Button } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { CardDto, patch$, post$, toastSuccess, useApi } from "../../../shared";
import CreateCardForm from "./CreateCardForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#22D3EE",
    },
  },
});

const createCard = (data: CardDto) => {
  return post$("card", data);
};

const updateCard = (data: CardDto) => {
  return patch$("card", data.id, data);
};

export default function CreateCardModal({
  sectionId,
  open,
  onCloseModal,
  initialCardData,
}: any) {
  const [card, setCard] = useState<CardDto>(initialCardData);
  const [createC, , pending_on_create] = useApi(
    createCard,
    {},
    {
      onSuccess: () => {
        toastSuccess("Task created Successfully!");
        onCloseModal(true);
      },
    }
  );

  const [updateC] = useApi(
    updateCard,
    {},
    {
      onSuccess: () => {
        toastSuccess("Task updated Successfully!");
        onCloseModal(true);
      },
    }
  );

  const submit = () => {
    initialCardData?.id
      ? updateC({
          ...initialCardData,
          ...card,
          sectionId,
        })
      : createC({
          ...card,
          sectionId,
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
      <div className="w-full flex px-4 pb-5 justify-start items-center">
        <h1 className=" font-bold">New Task</h1>
      </div>
      {/* workspace type */}
      <CreateCardForm
        card={card}
        onCardChange={(card: CardDto) => {
          setCard(card);
        }}
      ></CreateCardForm>
      {/* confirmation */}
      <div className="w-full flex justify-end p-6">
        <ThemeProvider theme={theme}>
          <Button
            color="primary"
            variant="contained"
            disabled={pending_on_create || !card?.title || !card?.description}
            onClick={submit}
          >
            {initialCardData?.id ? "Edit" : "Create"}
          </Button>
        </ThemeProvider>
      </div>
    </Dialog>
  );
}
