import { test, expect } from '@playwright/test';
import { BookingService } from '../../src/services/bookingService';
import { generateBookingData } from '../../src/data/booking';
import { AuthService } from '../../src/services/authService';

test('create booking with valid data', async ({ request }) => {
    const bookingService = new BookingService(request);
    const bookingData = generateBookingData(); 
    const response = await bookingService.createBooking(bookingData);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody.booking).toMatchObject(bookingData);
});

test('get booking by ID', async ({ request }) => {
    const bookingService = new BookingService(request);
    const bookingData = generateBookingData(); 
    const createResponse = await bookingService.createBooking(bookingData);
    const createResponseBody = await createResponse.json();
    const bookingId = createResponseBody.bookingid; 
    const getResponse = await bookingService.getBooking(bookingId);

    expect(getResponse.status()).toBe(200);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody).toMatchObject(bookingData);
});

test('fail obligatory fields missing', async ({ request }) => {
    const bookingService = new BookingService(request);
    const bookingData: Partial<ReturnType<typeof generateBookingData>> = generateBookingData();
    delete bookingData.firstname; 
    const response = await bookingService.createBooking(bookingData);

    expect(response.status()).toBe(500);
    const responseBody = await response.text();
    expect(responseBody).toBe('Internal Server Error');

});
