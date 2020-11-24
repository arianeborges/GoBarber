import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeAppointmentsRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeAppointmentsRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Mary Loe',
      email: 'mary@example.com',
      password: '123456'
    });

    const response = await authenticateUser.execute({
      email: 'mary@example.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able to authenticate with non existing user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeAppointmentsRepository, fakeHashProvider);

    expect(authenticateUser.execute({
      email: 'mary@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with wrong password', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeAppointmentsRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeAppointmentsRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Mary Loe',
      email: 'mary@example.com',
      password: '123456'
    });

    expect(authenticateUser.execute({
      email: 'mary@example.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(AppError);
  });

});
