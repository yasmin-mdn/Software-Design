import { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
} from "@mui/material";
import { GrClose } from "react-icons/gr";
import {
  CardDto,
  get$,
  post$,
  SelectDto,
  toastSuccess,
  useApi,
} from "../../../shared";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#22D3EE",
    },
  },
});

const moveCard = (data: CardDto) => {
  return post$("card/movement", data);
};

const getWorkspaces = () => {
  return get$("workspace", []);
};

export default function MoveCardModal({
  sectionId,
  open,
  onCloseModal,
  cardId,
}: any) {
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [moveC, , pending_on_move] = useApi(
    moveCard,
    {},
    {
      onSuccess: () => {
        toastSuccess("Card Moved Successfully!");
        onCloseModal(true);
        setSelectedSection("");
      },
    }
  );
  const [getSectionsForSelect, sectionsForSelect] = useApi<SelectDto[]>(
    getWorkspaces,
    [],
    {
      convertor: (data: any) => {
        const result: SelectDto[] = [];
        data.forEach((w: any) => {
          result.push({
            type: "GROUP",
            title: w.title,
            value: w._id,
          });
          result.push(
            ...w.sections.map((s: any) => ({
              type: "ITEM",
              title: s.title,
              value: s._id,
            }))
          );
        });
        return result;
      },
    }
  );

  const submit = () => {
    moveC({
      cardId,
      destinationSectionId: selectedSection,
    });
  };

  useEffect(() => {
    if (cardId) getSectionsForSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  if (!cardId) return <></>;
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
        <h1 className=" font-bold">Move Task</h1>
      </div>
      {/* workspace type */}
      <div className="flex flex-row gap-8 justify-center">
        <FormControl className="w-11/12">
          <InputLabel id="move-card-select-label">Section</InputLabel>
          <Select
            labelId="move-card-select-label"
            id="move-card-select"
            value={selectedSection}
            label="Section"
            onChange={(e) => {
              setSelectedSection(e.target.value);
            }}
          >
            {sectionsForSelect.map((s: SelectDto) => {
              return s.type === "GROUP" ? (
                <ListSubheader
                  key={s.value}
                  className="flex items-center text-2xl"
                >
                  <div className="inline-block w-5 h-5 mx-2 bg-cyan-400 rounded-md"></div>
                  {s.title}
                </ListSubheader>
              ) : (
                <MenuItem
                  key={s.value}
                  value={s.value}
                  disabled={s.value === sectionId}
                >
                  <span className="ml-10 mx-2 font-bold"></span>
                  <span>{s.title}</span>
                  {s.value === sectionId && (
                    <span className="mx-2 bg-blue-200 rounded-md px-4">
                      current
                    </span>
                  )}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      {/* confirmation */}
      <div className="w-full flex justify-end p-6">
        <ThemeProvider theme={theme}>
          <Button
            color="primary"
            variant="contained"
            disabled={pending_on_move || !selectedSection}
            onClick={submit}
          >
            Move
          </Button>
        </ThemeProvider>
      </div>
    </Dialog>
  );
}
