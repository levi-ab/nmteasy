import IUser from "../data/models/user";

const apiURL = process.env.EXPO_PUBLIC_API_URL

class _userService {
   signIn = (email: string, password: string): Promise<{token: string, user: IUser}> => {
    return fetch(
      `${apiURL}/sign-in`,{
          method: "POST",
          body: JSON.stringify({
            "email": email,
            "password": password,
          }),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  };
}

const userService = new _userService();
export default userService;