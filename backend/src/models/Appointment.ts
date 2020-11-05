import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// represents how the data is composed
// which fields are
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
