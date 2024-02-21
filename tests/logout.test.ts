import request from "supertest";
import app from "../server";

describe('User Controller - Logout', () => {
    test('should return 400 if no session is started', async () => {
      const response = await request(app)
        .post('/api/users/logout');
  
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "No hay sesión iniciada." });
    });

    test('should clear cookie and return 204 if session is started', async () => {
      const response = await request(app)
        .post('/api/users/logout')
        .set('Cookie', ['token=someToken']);
  
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
      expect(response.header['set-cookie']).toEqual(['token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT']);
    });
});
