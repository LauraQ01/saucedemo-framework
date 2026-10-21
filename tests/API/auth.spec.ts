import { test, expect } from '@playwright/test';
import { AuthService } from '../../src/services/authService';

test('success auth with valid credentials', async ({ request }) => {
    const authService =  new AuthService(request);
    const response = await authService.createToken('admin', 'password123');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
});

test('fail auth with invalid credentials', async ({ request }) => {
    const authService =  new AuthService(request);
    const response = await authService.createToken('test', 'password123');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.reason).toBe('Bad credentials');
});
