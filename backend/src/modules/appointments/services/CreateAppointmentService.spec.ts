import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      user_id: '1',
      date: new Date(),
      provider_id: '12132456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12132456');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      user_id: '1',
      date: appointmentDate,
      provider_id: '12132456',
    });

    expect(
      createAppointment.execute({
        user_id: '1',
        date: appointmentDate,
        provider_id: '12132456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
