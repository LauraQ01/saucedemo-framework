import { APIRequestContext } from "@playwright/test";

export class AuthService {
  constructor(private request: APIRequestContext) {}

  async createToken(username: string, password: string) {
    return await this.request.post(
      "https://restful-booker.herokuapp.com/auth",
      {
        data: { username, password },
      },
    );
  }
}
