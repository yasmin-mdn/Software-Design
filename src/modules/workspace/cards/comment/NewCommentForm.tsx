import {
  Button,
  createTheme,
  TextareaAutosize,
  ThemeProvider,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { CommentDto, post$, toastSuccess, useApi } from "../../../../shared";
import Profile from "../../../../assets/profile.jpg";

const createComment = (data: CommentDto) => {
  return post$("comment", data);
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#22D3EE",
    },
  },
});

export default function NewCommentForm({ cardId, reload }: any) {
  const [comment, setComment] = useState<CommentDto | null>();
  const [createC] = useApi(createComment, {});
  const onCardChange = (comment: CommentDto) => {
    setComment(comment);
  };

  const submit = (resetForm: any) => {
    createC({
      ...comment,
      cardId: cardId,
    }).then((success: boolean) => {
      if (success) {
        resetForm();
        toastSuccess("Comment created Successfully!");
        reload(true);
      }
    });
  };

  return (
    <div className="card my-1 w-full h-full !rounded-md px-4">
      <div className="h-full flex ">
        <div className="avatar w-10 h-10 mr-4">
          <div className="w-10 h-10 rounded-full">
            <img src={Profile} alt="p.jpg" />
          </div>
        </div>
        <div className="w-full">
          <Formik initialValues={{}} onSubmit={(values, actions) => {}}>
            {(formProps) => {
              return (
                <>
                  <Form
                    className="form-control"
                    onChange={(e) => {
                      onCardChange({
                        ...comment,
                        [(e.target as any).name]: (e.target as any).value,
                      } as any);
                    }}
                  >
                    <div className="form-control w-full">
                      <TextareaAutosize
                        minRows={3}
                        className="textarea input-bordered w-full"
                        id="text"
                        name="text"
                        placeholder="Write your comment right here ..."
                      />
                    </div>
                  </Form>
                  <div className="py-2">
                    <ThemeProvider theme={theme}>
                      <Button
                        type="reset"
                        color="primary"
                        variant="contained"
                        disabled={!comment?.text}
                        onClick={submit.bind(null, formProps.resetForm)}
                      >
                        COMMENT
                      </Button>
                    </ThemeProvider>
                  </div>
                </>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
