
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column({ default: true })
  isActive: boolean;

  @Column({unique:true})
  username:string;

  @Column()
  role:string;

  @Column()
  password:string;

  @CreateDateColumn()
  createdAt:Date;

  @Column()
  createdBy:string;

  @UpdateDateColumn()
  updatedAt:Date;

  @Column()
  updatedBy:string;

}

/**
 * Create User
 */

// {
//   "firstName":"Aditya",
//   "lastName":"Suryavanshi",
//   "isActive":true,
//   "username":"Admin",
//   "password":"Admin@123",
//   "role":"admin",
//   "createdBy":"Admin",
//   "updatedBy":"Admin"
// }


/**
 * Login User
 */

// {
//   "username":"Admin@123",
//   "password":"Admin@123"
// }