import { Storage } from "../../../shared";
const fake_user = {
  id: 1,
  username: "test",
};

test("set localstorage must succeed", () => {
  Storage.setUserData(fake_user);
  expect(localStorage.getItem("USER_INFO")).toBe(JSON.stringify(fake_user));
});

test("get localstorage must succeed", () => {
  Storage.setUserData(fake_user);
  const data = Storage.getUserData();
  expect(JSON.stringify(data)).toBe(JSON.stringify(fake_user));
});

test("remove localstorage must succeed", () => {
  Storage.setUserData(fake_user);
  Storage.clearUserData();
  expect(localStorage.getItem("USER_INFO")).toBe(null);
});
