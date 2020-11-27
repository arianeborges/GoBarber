import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mary Loe',
      email: 'mary@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Mary Loe Silva',
      email: 'mary@example.com.br',
    });

    expect(updatedUser.name).toBe('Mary Loe Silva');
    expect(updatedUser.email).toBe('mary@example.com.br');
  });

  it('should not be able to update a nonexistent user', async () => {
    expect(
      updateProfileService.execute({
        user_id: '1',
        name: 'Mary Loe Silva',
        email: 'mary@example.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the email to other that is being used', async () => {
    await fakeUsersRepository.create({
      name: 'Mary Loe',
      email: 'mary@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'mary@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mary Loe',
      email: 'mary@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Mary Loe Silva',
      email: 'mary@example.com.br',
      old_password: '123456',
      password: '123456789',
    });

    expect(updatedUser.password).toBe('123456789');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mary Loe',
      email: 'mary@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Mary Loe Silva',
        email: 'mary@example.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mary Loe',
      email: 'mary@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Mary Loe Silva',
        email: 'mary@example.com.br',
        old_password: '1234567',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
