import { Dialog } from "@mui/material";
import { useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { CommentDto, get$, useApi } from "../../../../shared";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

const getComments = (card_id: string) => {
  return get$("comment", [{ key: "card_id", value: card_id }]);
};

export default function CommentModal({ open, onCloseModal, card }: any) {
  const [getC, data] = useApi<CommentDto[]>(getComments, [], {
    convertor: (data: any) => {
      const con = (i: any) => ({
        _id: i._id,
        user: i.user.username,
        text: i.text,
        replies: i.replies ? i.replies.map(con) : [],
      });
      return data.map(con);
    },
  });
  const reload = () => {
    getC(card._id);
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  return (
    <Dialog open={open} fullWidth={true} sx={{ overflowX: "auto" }}>
      {/* close btn */}
      <div className="flex justify-end sticky top-0 z-20 bg-white">
        <button
          className="relative left-0 pt-4 pr-4"
          onClick={() => onCloseModal(null)}
        >
          <GrClose />
        </button>
      </div>
      {/* header */}
      <div className="w-full flex px-4 pb-5 justify-start items-center sticky top-8 z-20 bg-white">
        <h1 className=" font-bold">Comments</h1>
      </div>
      <div className="m-4 mt-0 flex flex-col justify-center">
        {/* form */}
        {/* comments */}
        <NewCommentForm cardId={card._id} reload={reload} />
        {data.map((c: any, index: number) => {
          return (
            <Comment
              level={0}
              key={index}
              cardId={card._id}
              comment={c}
              reload={reload}
            />
          );
        })}
      </div>
    </Dialog>
  );
}
