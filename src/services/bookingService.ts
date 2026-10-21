import { APIRequestContext } from "@playwright/test";

export class BookingService {
  constructor(private request: APIRequestContext) {}

  async createBooking(data: any) {
    return await this.request.post(
      "https://restful-booker.herokuapp.com/booking",
      {
        data: data,
      },
    );
  }

  async getBooking(bookingId: number) {
    return await this.request.get(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    );
  }
}