import { useEffect } from "react";
import { get$, useApi } from "../../shared";
import CardLayout from "./cards/CardLayout";
import { useParams } from "react-router-dom";

const getWorkSpaceInformation = (sectionId: string) => {
  return get$("section_of_workspace", [
    { key: "section_id", value: sectionId },
  ]);
};

export default function WorkspaceMain() {
  const { id: sectionId } = useParams<{ id: string }>();
  const [getWorkSpaceInfo, response] = useApi(getWorkSpaceInformation, {});

  useEffect(() => {
    getWorkSpaceInfo(sectionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  return (
    <>
      <header className="bg-white border-t-[1px] border-t-gray-200 flex flex-col p-2 pl-7 pr-7">
        <ul className="flex flex-row justify-between align-center">
          <li>{response?.title}</li>
        </ul>
      </header>
      <CardLayout sectionId={sectionId} workspaceId={response.workspaceId}></CardLayout>
    </>
  );
}
