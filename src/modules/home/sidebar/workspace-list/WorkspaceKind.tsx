import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function WorkspaceKind({
  title,
  setTitle,
  link,
  setLink,
  type,
  setType,
}: any) {
  return (
    <div className="flex flex-col justify-start gap-5 p-6 pb-4 pt-10">
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full m-auto"
        label="Title"
        variant="outlined"
      />
      <FormControl className="w-full">
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="Scrum">Scrum</MenuItem>
          <MenuItem value="Custom">Custom</MenuItem>
        </Select>
      </FormControl>
      <TextField
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full m-auto"
        label="Calander Link"
        placeholder="you can paste your google calander link here to add to workspace"
        variant="outlined"
      />
    </div>
  );
}
