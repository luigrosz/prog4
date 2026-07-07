import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'Identificador único' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'admin', description: 'Nome de usuário' })
  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
