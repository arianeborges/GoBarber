import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeAppointmentsRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Mary Loe',
      email: 'mary@example.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email address', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeAppointmentsRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Mary Loe',
      email: 'mary@gmail.com',
      password: '123456'
    });

    expect(createUser.execute({
      name: 'Mary Loe',
      email: 'mary@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });
});
