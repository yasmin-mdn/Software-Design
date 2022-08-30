import { CookieHandler } from "../../../shared";
const fake_token = "FAKE_TOKEN";

test("set token must succeed", () => {

  CookieHandler.setToken(fake_token);
  expect(CookieHandler.getToken()).toBe(fake_token);
  
  CookieHandler.removeToken();
  expect(CookieHandler.getToken()).toBe("");
});

test("get token must succeed", () => {
    CookieHandler.setToken(fake_token);
    expect(CookieHandler.getToken()).toBe(fake_token);
    CookieHandler.setToken(1);
    expect(CookieHandler.getToken()).toBe("1");
});

test("remove token must succeed", () => {
    CookieHandler.setToken(fake_token);
    CookieHandler.removeToken();
    expect(CookieHandler.getToken()).toBe("");
});
