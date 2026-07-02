import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private pessoaRepository: Repository<Pessoa>,
  ) {}

  create(createPessoaDto: CreatePessoaDto) {
    return this.pessoaRepository.save(createPessoaDto);
  }

  findAll() {
    return this.pessoaRepository.find();
  }

  findOne(id: number) {
    return this.pessoaRepository.findOneBy({ id });
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    await this.pessoaRepository.update(id, updatePessoaDto);
    return this.pessoaRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.pessoaRepository.delete(id);
  }
}
