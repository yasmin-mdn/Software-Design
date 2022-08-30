import { CardDto } from "../../../shared";
import { Formik, Form, Field } from "formik";
import { TextareaAutosize } from "@mui/material";

export default function CreateCardForm({
  card,
  onCardChange,
}: {
  card?: CardDto;
  onCardChange: (c: CardDto) => void;
}) {
  return (
    <div>
      <Formik initialValues={card ?? {}} onSubmit={(values, actions) => {}}>
        <Form
          className="form-control px-4"
          onChange={(e) => {
            onCardChange({
              ...card,
              [(e.target as any).name]: (e.target as any).value,
            } as any);
          }}
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <Field
              className="input input-bordered w-full"
              id="title"
              value={card?.title}
              name="title"
              placeholder="What should be this task's title ?"
            />
          </div>
          <div className="form-control pt-4 w-full">
            <label className="label">
              <span className="label-text">Desctiption</span>
            </label>
            <TextareaAutosize
              minRows={3}
              value={card?.description}
              className="textarea input-bordered w-full"
              id="description"
              name="description"
              placeholder="What should be done in this task ?"
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
