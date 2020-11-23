import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointment';

// this class will be responsible to create, delete, update e remove appointments
// keep the information saved about these methods
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // async await is a Promise
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
