import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoaService.create(createPessoaDto);
  }

  @Get()
  findAll() {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pessoaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoaService.update(id, updatePessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pessoaService.remove(id);
  }
}
