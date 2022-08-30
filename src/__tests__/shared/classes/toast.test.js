import { calculateTime } from "../../../shared";

const messages_with_duration = [
  {
    message: "justw gwrelklgpr kgpkreo pgkreopkghpor ekhgporekhporekphogr",
    duration: 3000,
  },
  {
    message: "jukfpoewkfpoewkfostw gwrelklgpr kgpkreo pgkreopkghpor ekhgporekhporekphogr",
    duration: 3700,
  },
  {
    message: "jukfpoewkfpoewkfostw gwrelkfc,v,ew,;lw,gf;l flew,flew,f;lgpr kgpkreo pgkreopkghpor ekhgporekhporekphogr",
    duration: 5150,
  },
  {
    message: "",
    duration: 3000,
  },
  {
    message: 'w',
    duration: 3000,
  },
  {
    message: 212121,
    duration: 3000,
  },
];

test("calculateTime must succeed", () => {
  messages_with_duration.forEach(i=>{
    expect(calculateTime(i.message)).toBe(i.duration);
  })
});