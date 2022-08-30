import { useState } from "react";

export default function CreateReply({ submit }: any) {
  const [text, setText] = useState<string>("");

  const onChange = (e: any) => {
    setText(e.target.value);
  };

  return (
    <div className="text-sm mt-4 w-full flex items-center justify-between flex-nowrap">
      <input
        type="text"
        value={text}
        onInput={onChange}
        className="input input-sm mx-2 input-bordered   flex-1"
        placeholder="leave a comment ..."
      />
      <button
        className=" px-4 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md"
        color="primary"
        disabled={!text}
        onClick={() => submit(text)}
      >
        reply
      </button>
    </div>
  );
}
