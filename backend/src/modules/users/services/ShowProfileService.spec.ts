// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mary Loe',
      email: 'mary@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Mary Loe');
    expect(profile.email).toBe('mary@example.com');
  });

  it('should not be able to show user profile from a nonexisting user', async () => {
    expect(
      showProfile.execute({
        user_id: 'nonexisting-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
