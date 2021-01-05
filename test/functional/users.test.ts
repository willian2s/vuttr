import { User } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('User functional user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  const defaultUser = {
    name: 'John Doe',
    email: 'john@mail.com',
    password: '1234',
  };
  describe('When creating a new user', () => {
    it('Should successfully create a new user with encrypted password', async () => {
      const response = await global.testRequest
        .post('/users')
        .send(defaultUser);
      expect(response.status).toBe(201);
      await expect(
        AuthService.comparePasswords(
          defaultUser.password,
          response.body.password
        )
      ).resolves.toBeTruthy();
      expect(response.body).toEqual(
        expect.objectContaining({
          ...defaultUser,
          ...{ password: response.body.password },
        })
      );
    });

    it('Should return 422 when there is a validation error', async () => {
      const wrongUser = {
        email: 'john@mail.com',
        password: '1234',
      };
      const response = await global.testRequest.post('/users').send(wrongUser);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error: 'User validation failed: name: Path `name` is required.',
      });
    });

    it('Should return 409 when the email already exists', async () => {
      await global.testRequest.post('/users').send(defaultUser);
      const response = await global.testRequest
        .post('/users')
        .send(defaultUser);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        code: 409,
        error: 'User validation failed: email: already exists in the database.',
      });
    });
  });

  describe('When authenticating a user', () => {
    it('Should generate a token for a valid user', async () => {
      await new User(defaultUser).save();
      const response = await global.testRequest
        .post('/users/authenticate')
        .send({ email: defaultUser.email, password: defaultUser.password });

      expect(response.body).toEqual(
        expect.objectContaining({ token: expect.any(String) })
      );
    });

    it('Should return UNAUTHORIZED if the user with the given email is not found', async () => {
      const response = await global.testRequest
        .post('/users/authenticate')
        .send({ email: 'some-email@mail.com', password: '1234' });

      expect(response.body).toEqual({
        code: 401,
        error: 'User not found!',
      });
    });

    it('Should return ANAUTHORIZED if the user is found but the password does not match', async () => {
      await new User(defaultUser).save();

      const response = await global.testRequest
        .post('/users/authenticate')
        .send({ email: defaultUser.email, password: 'different password' });

      expect(response.body).toEqual({
        code: 401,
        error: 'Password does not match!',
      });
    });
  });
});
