import { ILeague } from "../data/models/user";

const apiURL = process.env.EXPO_PUBLIC_API_URL;
class _leagueService {

  getLeagues = (
    token: string
  ): Promise<ILeague[]> => {
    return fetch(`${apiURL}/leagues`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  }
}

const leagueService = new _leagueService();
export default leagueService;
