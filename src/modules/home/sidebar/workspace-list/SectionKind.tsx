import { TextField } from "@mui/material";

export default function SectionKind({ title, setTitle, _id, set_id }: any) {
  return (
    <div className="flex flex-col justify-start items-start p-6 pb-0">
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full m-auto"
        label="Title"
        variant="outlined"
      />
    </div>
  );
}
