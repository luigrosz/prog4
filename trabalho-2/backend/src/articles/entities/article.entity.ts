import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('articles')
export class Article {
  @ApiProperty({ example: 1, description: 'Identificador único' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Daria Morgendorffer',
    description: 'Título do conteúdo',
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    example: 'Adolescente intelectual e sarcástica...',
    description: 'Corpo principal do artigo',
  })
  @Column({ type: 'text' })
  content: string;

  @ApiPropertyOptional({
    example: 'img/daria.webp',
    description: 'Caminho ou URL da imagem associada',
    nullable: true,
  })
  @Column({ name: 'image_url', type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @ApiProperty({
    example: 10,
    description: 'Ordem de apresentação (prioridade de exibição)',
    default: 0,
  })
  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder: number;

  @ApiPropertyOptional({
    example: 'personagens',
    description: 'Categoria do artigo para agrupamento',
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de última atualização' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
