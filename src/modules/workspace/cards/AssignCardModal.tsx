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

const assignCard = (data: CardDto) => {
    return post$("card/assignment", data);
};

const getWorkspaceMembers = (workspaceId: any) => {
    return get$("workspace/member", [
      { key: "workspace_id", value: workspaceId },
    ]);
};


export default function AssignmentCardModal({
    workspaceId,
    open,
    onCloseModal,
    cardId,
}: any) {
    const [selectedMember, setSelectedMember] = useState<string>("");
    const [assignC, , pending_on_assign] = useApi(
        assignCard,
        {},
        {
            onSuccess: () => {
                toastSuccess("Assigned Successfully!");
                onCloseModal(true);
                setSelectedMember("");
            },
        }
    );
    const [getMembersForSelect, membersForSelect] = useApi<SelectDto[]>(
        getWorkspaceMembers,
        [],
        {
            convertor: (data: any) => {
                const result: SelectDto[] = [];
                data.forEach((w: any) => {
                    result.push({
                        type: "ITEM",
                        title: w.user.username,
                        value: w._id,
                    });
                });
                return result;
            },
        }
    );

    const submit = () => {
        assignC(
            {
                cardId,
                memberId: selectedMember
            }
        )
    };

    useEffect(() => {
        if (cardId) getMembersForSelect(workspaceId);
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
                <h1 className=" font-bold">Assign Task</h1>
            </div>
            {/* workspace type */}
            <div className="flex flex-row gap-8 justify-center">
                <FormControl className="w-11/12">
                    <InputLabel id="assign-card-select-label">Member</InputLabel>
                    <Select
                        labelId="assign-card-select-label"
                        id="assign-card-select"
                        value={selectedMember}
                        label="Member"
                        onChange={(e) => {
                            setSelectedMember(e.target.value);
                        }}
                    >
                        {membersForSelect.map((s: SelectDto) => {
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
                                    disabled={s.value === workspaceId}
                                >
                                    <span className="ml-10 mx-2 font-bold"></span>
                                    <span>{s.title}</span>
                                 
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
                        disabled={pending_on_assign || !selectedMember}
                        onClick={submit}
                    >
                        Assign
                    </Button>
                </ThemeProvider>
            </div>
        </Dialog>
    );
}
