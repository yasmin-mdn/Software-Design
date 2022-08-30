import {  useEffect } from "react";
import {
    Dialog,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { GrClose } from "react-icons/gr";
import {
    get$,
    delete$,
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

const getCard = (cardId:string)=>{
    return get$("card", [{ key: "card_id", value: cardId }]);
}

const removeAssignee = ({cardId,memberId}:any) => {
    return delete$(`card/assignment?card_id=${cardId}&member_id=${memberId}`,memberId);//
  };



const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function UnAssignmentCardModal({
    open,
    onCloseModal,
    cardId,
}: any) {
    const [getC, assignees] = useApi<any[]>(
        getCard,
        [],
        {
          convertor: (data: any) => {
            return data.assignees.map((a:any)=>({key:a._id,label:a.user.username}))
          },
        }
      );

      const [deleteAssignee] = useApi(
        removeAssignee,
        {},
        {
          onSuccess: () => {
            toastSuccess("assignee removed Successfully!");
            getC(cardId);
          },
        }
      );

    const handleDelete = (assignee: any) => {
        deleteAssignee({cardId,memberId:assignee.key})
    };

    useEffect(() => {
        getC(cardId)
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
                <h1 className=" font-bold">Remove Assignment</h1>
            </div>
            <div className="flex flex-row gap-8 justify-center">
                {/* <FormControl className="w-11/12"> */}
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0,
                        }}
                        component="ul"
                    >
                        {assignees.map((data:any) => {

                            return (
                                <ListItem key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onDelete={()=>handleDelete(data)}
                                    />
                                </ListItem>
                            );
                        })}
                    </Paper>

                {/* </FormControl> */}
            </div>
            <div className="w-full flex justify-end p-6">
                <ThemeProvider theme={theme}>
                </ThemeProvider>
            </div> 
        </Dialog>
    );
}
