import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SMS {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public phoneNumber: string;

  @Column({ default: false })
  public isPhoneNumberConfirmed: boolean;
}
