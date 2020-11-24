import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeAppointmentsRepository);

    const user = await createUser.execute({
      name: 'Ariane',
      email: 'ariianeboorges@gmail.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email address', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeAppointmentsRepository);

    await createUser.execute({
      name: 'Ariane',
      email: 'ariianeboorges@gmail.com',
      password: '123456'
    });

    expect(createUser.execute({
      name: 'Ariane',
      email: 'ariianeboorges@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });
});
