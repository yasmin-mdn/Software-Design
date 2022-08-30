import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { post$, toastSuccess, useApi, delete$ } from "../../../shared";
import { WithContext as ReactTags } from "react-tag-input";
import classes from "../../../shared/styles/reactTags.module.scss";

const postLabelRequest = (data: { cardId: string; name: string }) => {
  return post$("card/label", data);
};

const deleteLabelRequest = (id: string, name: string) => {
  return delete$(`card/label?card_id=${id}&name=${name}`, "", false);
};

export default function LabelModal({ open, onCloseModal, card }: any) {
  const [tags, setTags] = useState<{ id: string; text: string }[]>([]);
  useEffect(() => {
    if (card) {
      if (card.labels.length > 0) {
        const newTags = [] as { id: string; text: string }[];
        card.labels.forEach((label: string) => {
          newTags.push({ id: label, text: label });
        });
        setTags(newTags);
      }
    }
  }, [card]);

  const [postLabel] = useApi(
    postLabelRequest,
    {},
    {
      onSuccess: () => {
        toastSuccess("Label Added Successfully!");
        onCloseModal(true);
      },
    }
  );
  const [deleteLabel] = useApi(
    deleteLabelRequest,
    {},
    {
      onSuccess: () => {
        toastSuccess("Label deleted Successfully!");
      },
    }
  );

  const handleDelete = (i: number) => {
    deleteLabel(card.id, tags[i].text);
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: { id: string; text: string }) => {
    setTags([...tags, tag]);
    postLabel({ cardId: card.id, name: tag.text });
  };

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  return (
    <Dialog open={open} fullWidth={true} sx={{ overflowX: "auto" }}>
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
        <h1 className=" font-bold">Tags</h1>
      </div>
      <div className="m-4 mt-0">
        {" "}
        <div className={classes.ReactTags}>
          <ReactTags
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            delimiters={delimiters}
            placeholder="Type label and press enter..."
            minQueryLength={2}
            maxLength={5}
            autofocus={false}
            allowDeleteFromEmptyInput={true}
            autocomplete={true}
            readOnly={false}
            allowUnique={true}
            inline={true}
            allowAdditionFromPaste={true}
            inputFieldPosition="top"
            tags={tags}
          />
        </div>
      </div>
    </Dialog>
  );
}
