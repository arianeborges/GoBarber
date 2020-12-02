import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list appointments on a  specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: '1',
      provider_id: '123',
      date: new Date(2020, 11, 29, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: '1',
      provider_id: '123',
      date: new Date(2020, 11, 29, 9, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: '123',
      day: 29,
      year: 2020,
      month: 12,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
