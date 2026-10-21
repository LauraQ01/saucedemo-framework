import { test, expect } from '@playwright/test';
import { BookingService } from '../../src/services/bookingService';
import { generateBookingData } from '../../src/data/booking';
import { AuthService } from '../../src/services/authService';

let authToken: string;
let bookingId: number;
let bookingData: any;

test.beforeEach(async ({ request }) => {
    const authService =  new AuthService(request);
    const responseAuth= await authService.createToken('admin', 'password123'); 
    const responseBodyAuth = await responseAuth.json();
    authToken = responseBodyAuth.token;

    const bookingService = new BookingService(request);
    bookingData = generateBookingData(); 
    const responseBooking = await bookingService.createBooking(bookingData);
    const responseBodyBooking = await responseBooking.json();
    bookingId = responseBodyBooking.bookingid; 
});

test('successfully update booking', async ({ request }) => { 
    const bookingService = new BookingService(request);
    const updatedBookingData = generateBookingData(); 
    const response = await bookingService.updateBooking(bookingId, updatedBookingData, authToken);
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toMatchObject(updatedBookingData);

    //Verify get 
    const getResponse = await bookingService.getBooking(bookingId);
    expect(getResponse.status()).toBe(200);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody).toMatchObject(updatedBookingData);

});

test('Successfully partially update booking', async ({ request }) => {
    const bookingService = new BookingService(request);
    const partialUpdateData = { firstname: 'UpdatedFirstName' }; 
    const response = await bookingService.partialUpdateBooking(bookingId, partialUpdateData, authToken);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.firstname).toBe(partialUpdateData.firstname);
    expect(responseBody.lastname).toBe(bookingData.lastname);

    //Verify get 
    const getResponse = await bookingService.getBooking(bookingId);
    expect(getResponse.status()).toBe(200);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody.firstname).toBe(partialUpdateData.firstname);
    expect(getResponseBody.lastname).toBe(bookingData.lastname);

});