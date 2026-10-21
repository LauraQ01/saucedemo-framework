import { APIRequestContext } from "@playwright/test";

const BASE_URL = "https://restful-booker.herokuapp.com";

export class BookingService {
  constructor(private request: APIRequestContext) {}
  private authHeaders(token: string) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: `token=${token}`,
    };
  }

  async createBooking(data: any) {
    return await this.request.post(`${BASE_URL}/booking`, {
      data: data,
    });
  }

  async getBooking(bookingId: number) {
    return await this.request.get(`${BASE_URL}/booking/${bookingId}`);
  }

  async updateBooking(bookingId: number, data: any, token: string) {
    return await this.request.put(`${BASE_URL}/booking/${bookingId}`, {
      data: data,
      headers: this.authHeaders(token),
    });
  }

  async partialUpdateBooking(bookingId: number, data: any, token: string) {
    return await this.request.patch(`${BASE_URL}/booking/${bookingId}`, {
      data: data,
      headers: this.authHeaders(token),
    });
}

  async deleteBooking(bookingId: number, token: string) {
    return await this.request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: this.authHeaders(token),
    });
}
}