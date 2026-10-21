import { faker } from '@faker-js/faker';

export function generateBookingData() {
    const checkin = faker.date.future();
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 100, max: 1000 }),
        depositpaid: faker.datatype.boolean(),
        bookingdates: {
            checkin: checkin.toISOString().split('T')[0],
            checkout: faker.date.future({refDate: checkin}).toISOString().split('T')[0],
        },
        additionalneeds: faker.lorem.word(),
    };
}