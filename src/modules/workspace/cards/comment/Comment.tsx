import { CommentDto, post$, useApi } from "../../../../shared";
import CreateReply from "./CreateReply";
import Profile from "../../../../assets/profile.jpg";

const makeReply = (data: CommentDto) => {
  return post$("comment", data);
};

export default function Comment({
  level,
  cardId,
  comment,
  reload,
}: {
  level: number;
  cardId: string;
  comment: CommentDto;
  reload: Function;
}) {
  const [replay] = useApi(makeReply, {});

  const sendReply = (text: string) => {
    replay({
      text,
      cardId: cardId,
      parentComment: comment._id,
    }).then((success: boolean) => {
      if (success) reload();
    });
  };

  return (
    <div className="card my-1 w-full h-full !rounded-md bg-gray-50 hover:bg-gray-100 p-4">
      <div className="h-full flex">
        <div className="avatar w-10 h-10 mr-4">
          <div className="w-10 h-10 rounded-full">
            <img src={Profile} alt="p.jpg" />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-2">
            <span>{comment.user}</span>
            <div className="m-0 p-0 text-xs text-gray-400 text-md">
              {comment.createdAt}
            </div>
          </div>
          <div className="text-sm">{comment.text}</div>
        </div>
      </div>
      {level === 0 && <CreateReply submit={sendReply}></CreateReply>}
      <div className="m-4 mt-1 flex flex-col justify-center border-l-4 border-l-gray-400">
        {comment.replies && level === 0
          ? comment.replies.map((c: any, index: number) => {
              return (
                <Comment
                  level={level + 1}
                  key={index + c._id}
                  cardId={cardId}
                  comment={c}
                  reload={reload}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}
