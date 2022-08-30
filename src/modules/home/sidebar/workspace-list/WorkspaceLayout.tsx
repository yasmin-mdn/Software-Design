import { useEffect } from "react";
import Workspace from "./Workspace";
import { List } from "@mui/material";
import NewWorkspaceHandler from "./NewWorkspaceHandler";
import { get$, useApi, WorkspaceDto } from "../../../../shared";

const getWorkspaces = () => {
  return get$("workspace", []);
};

export default function WorkspaceLayout() {
  const [getData, data] = useApi<WorkspaceDto[]>(getWorkspaces, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onReload = () => {
    getData();
  };

  return (
    <>
      <NewWorkspaceHandler reload={onReload} />
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {data.map((workspace: WorkspaceDto, index: number) => {
          return <Workspace key={index} reload={onReload} data={workspace} />;
        })}
      </List>
    </>
  );
}
