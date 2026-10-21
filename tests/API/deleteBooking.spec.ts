import { test, expect } from "@playwright/test";
import { BookingService } from "../../src/services/bookingService";
import { generateBookingData } from "../../src/data/booking";
import { AuthService } from "../../src/services/authService";

let authToken: string;
let bookingId: number;
let bookingData: any;

test.beforeEach(async ({ request }) => {
  const authService = new AuthService(request);
  const responseAuth = await authService.createToken("admin", "password123");
  const responseBodyAuth = await responseAuth.json();
  authToken = responseBodyAuth.token;

  const bookingService = new BookingService(request);
  bookingData = generateBookingData();
  const responseBooking = await bookingService.createBooking(bookingData);
  const responseBodyBooking = await responseBooking.json();
  bookingId = responseBodyBooking.bookingid;
});

test("successfully delete booking", async ({ request }) => {
  const bookingService = new BookingService(request);
  const response = await bookingService.deleteBooking(bookingId, authToken);
  expect(response.status()).toBe(201);
  //Verify get returns 404
  const getResponse = await bookingService.getBooking(bookingId);
  expect(getResponse.status()).toBe(404);
});

test("fail to delete booking with invalid token", async ({ request }) => {
  const bookingService = new BookingService(request);
  const invalidToken = "invalidToken";
  const response = await bookingService.deleteBooking(bookingId, invalidToken);
  expect(response.status()).toBe(403);
  const responseBody = await response.text();
  expect(responseBody).toBe("Forbidden");
  //Verify get
  const getResponse = await bookingService.getBooking(bookingId);
  expect(getResponse.status()).toBe(200);
});
