import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 28, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      user_id: '1',
      date: new Date(2020, 11, 28, 13),
      provider_id: '12132456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12132456');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 11, 28, 15);

    await createAppointment.execute({
      user_id: '1',
      date: appointmentDate,
      provider_id: '12132456',
    });

    await expect(
      createAppointment.execute({
        user_id: '1',
        date: appointmentDate,
        provider_id: '12132456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 28, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: '1',
        provider_id: '12132456',
        date: new Date(2020, 11, 28, 11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 28, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: '12132456',
        provider_id: '12132456',
        date: new Date(2020, 11, 28, 13),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 28, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: '1',
        provider_id: '12132456',
        date: new Date(2020, 11, 28, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        user_id: '1',
        provider_id: '12132456',
        date: new Date(2020, 11, 28, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
