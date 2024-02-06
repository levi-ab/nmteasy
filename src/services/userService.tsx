import IUser from "../data/models/user";

const apiURL = process.env.EXPO_PUBLIC_API_URL;

class _userService {
  signIn = (
    email: string,
    password: string
  ): Promise<{ token: string; user: IUser }> => {
    return fetch(`${apiURL}/sign-in`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  };

  signUp = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<{ token: string; user: IUser }> => {
    return fetch(`${apiURL}/sign-up`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  };

  edit = (
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    token: string
  ): Promise<{ token: string; user: IUser }> => {
    return fetch(`${apiURL}/user/edit`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: firstName,
        last_name: lastName,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  };

  sendComplaint  = (
    token: string,
    lesson_id: string,
    complaint_text: string,
    question_id: string,
    lesson_type: string,
  ): Promise<null> => {
    return fetch(`${apiURL}/lesson-complaint`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        "lesson_id": lesson_id,
        "complaint_text": complaint_text,
        "question_id": question_id,
        "lesson_type": lesson_type
    }),
    }).then((res) => {
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