import jwt_decode from "jwt-decode";

export class Storage {
  public static setUserData(data: any) {
    localStorage.setItem("USER_INFO", JSON.stringify(data));
  }
  public static decodeToken(token: string) {
    try {
      return jwt_decode(token);
    } catch {
      return {};
    }
  }

  public static getUserData(): any {
    return JSON.parse(localStorage.getItem("USER_INFO") ?? "{}");
  }

  public static clearUserData() {
    localStorage.removeItem("USER_INFO");
  }
}
