import { v4 } from 'uuid';

// represents how the data is composed
// which fields are
class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = v4();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
