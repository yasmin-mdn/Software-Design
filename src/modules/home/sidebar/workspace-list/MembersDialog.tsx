import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import { GrClose } from "react-icons/gr";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  TableBody,
  TableCell,
  Table,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
} from "@mui/material";
import {
  post$,
  get$,
  delete$,
  toastSuccess,
  useApi,
  WorkspaceDto,
  Storage,
  MemberRole,
  InviteStatus,
} from "../../../../shared";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#22D3EE",
    },
  },
});

const invitePeopleToWorkspace = (data: WorkspaceDto) => {
  return post$("workspace_invitation", data);
};

const getWorkSpaceInformation = (workspaceId: string) => {
  return get$("workspace", [{ key: "workspace_id", value: workspaceId }]);
};

const removeFromWorkspace = (id: string) => {
  return delete$(`workspace/member/${id}`, "", false);
};

export default function MembersDialog({
  open = false,
  onCloseModal,
  workspaceId,
}: any) {
  const [emailInput, setEmailInput] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [getWorkSpaceInfo, workspaceMembers] = useApi(
    getWorkSpaceInformation,
    [],
    {
      convertor: (data: any) => {
        const currentUserId = Storage.getUserData().id;
        const members = data ? data.members || [] : [];
        setIsAdmin(
          (members.find((m: any) => m.user._id === currentUserId)
            .role as MemberRole) === "Admin"
        );
        return members;
      },
    }
  );
  const [invitePeople] = useApi(
    invitePeopleToWorkspace,
    {},
    {
      onSuccess: () => {
        toastSuccess(`${emailInput} was invited successfully!`);
        getWorkSpaceInfo(workspaceId);
      },
    }
  );

  const [removePeople] = useApi(
    removeFromWorkspace,
    {},
    {
      onSuccess: () => {
        toastSuccess("Person was deleted Successfully!");
      },
    }
  );

  const submit = () => {
    invitePeople({
      userEmail: emailInput,
      role: selectedRole,
      workspaceId,
    });
  };

  useEffect(() => {
    getWorkSpaceInfo(workspaceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={open} fullWidth={true} maxWidth="lg">
      {/* close btn */}
      <div className="flex justify-end">
        <button
          className="relative left-0 pt-4 pr-4"
          onClick={() => onCloseModal(null)}
        >
          <GrClose />
        </button>
      </div>
      {/* body */}
      <div className="p-6 flex flex-col gap-5">
        {isAdmin && (
          <div className="flex flex-row gap-8 justify-center">
            <TextField
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-3/6"
              type="email"
              label="Email"
              placeholder="Enter an email to invite to workspace"
              variant="outlined"
              error={
                emailInput.length > 0 &&
                !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  emailInput
                )
              }
            />
            <FormControl className="w-2/6">
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRole}
                label="Role"
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Member">Member</MenuItem>
              </Select>
            </FormControl>
            <ThemeProvider theme={theme}>
              <Button
                onClick={() => submit()}
                className="w-1/6"
                color="primary"
                variant="contained"
                disabled={
                  !emailInput ||
                  (emailInput.length > 0 &&
                    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                      emailInput
                    )) ||
                  !selectedRole
                }
              >
                Invite
              </Button>
            </ThemeProvider>
          </div>
        )}
        {workspaceMembers.length > 0 ? (
          <>
            <div className="text-xl">Members List</div>
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: "bolder",
                          fontSize: "16px",
                        }}
                      >
                        Username
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bolder",
                          fontSize: "16px",
                        }}
                        align="left"
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bolder",
                          fontSize: "16px",
                        }}
                        align="left"
                      >
                        Role
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bolder",
                          fontSize: "16px",
                        }}
                        align="center"
                      >
                        Status
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bolder",
                          fontSize: "16px",
                        }}
                        align="left"
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workspaceMembers.map((member: Record<any, any>) => (
                      <TableRow
                        key={member._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {member.user.username}
                        </TableCell>
                        <TableCell align="left">{member.user.email}</TableCell>
                        <TableCell align="left">{member.role}</TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="outlined"
                            color={
                              (member.status as InviteStatus) === "Pending"
                                ? "warning"
                                : "success"
                            }
                          >
                            {member.status}
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            size="small"
                            onClick={() =>
                              removePeople(`${workspaceId}/${member.user._id}`)
                            }
                            variant="outlined"
                            disabled={!isAdmin}
                            color="error"
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        ) : (
          <div className="mt-10 font-bold text-center">No Members!</div>
        )}
      </div>
    </Dialog>
  );
}
