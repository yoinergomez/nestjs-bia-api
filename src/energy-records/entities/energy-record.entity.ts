import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('energy_records')
export class EnergyRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  meter_date: Date;

  @Column()
  meter_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 5 })
  active_energy: number;
}
