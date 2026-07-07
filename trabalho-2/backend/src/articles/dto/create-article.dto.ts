import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    example: 'Daria Morgendorffer',
    description: 'Título do conteúdo',
  })
  title: string;

  @ApiProperty({
    example: 'Adolescente intelectual e sarcástica...',
    description: 'Corpo principal do artigo',
  })
  content: string;

  @ApiPropertyOptional({
    example: 'img/daria.webp',
    description: 'Caminho ou URL da imagem associada',
  })
  imageUrl?: string;

  @ApiPropertyOptional({
    example: 10,
    description: 'Ordem de apresentação (prioridade de exibição)',
    default: 0,
  })
  sortOrder?: number;

  @ApiPropertyOptional({
    example: 'personagens',
    description: 'Categoria do artigo para agrupamento',
  })
  category?: string;
}
