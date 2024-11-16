import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Diagram, DiagramDTO } from 'src/entities/diagram.entity';
import {
  CreateDiagramRequestDTO,
  UpdateDiagramRequestDTO,
} from 'src/interfaces/dto/diagrams/diagrams.request';
import {
  deserializeFromBase64,
  serializeToBase64,
} from 'src/utils/base64.handler';

@Injectable()
export class DiagramsService {
  constructor(
    @InjectRepository(Diagram)
    private diagramsRepository: Repository<Diagram>,
    private dataSource: DataSource,
  ) {}

  async create(diagram: CreateDiagramRequestDTO): Promise<DiagramDTO> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (diagram.serialized_object) {
        diagram.serialized_object = serializeToBase64(
          diagram.serialized_object,
        );
      }
      const createdDiagram = await queryRunner.manager.save(Diagram, diagram);
      await queryRunner.manager.save(Diagram, diagram);
      await queryRunner.commitTransaction();
      return DiagramDTO.toDTO(createdDiagram);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<DiagramDTO[]> {
    const diagrams = await this.diagramsRepository.find();
    return diagrams.map((diagram) => {
      if (diagram.serialized_object) {
        diagram.serialized_object = deserializeFromBase64(
          diagram.serialized_object,
        );
      }
      return DiagramDTO.toDTO(diagram);
    });
  }

  async findOne(id: string): Promise<DiagramDTO | null> {
    const diagram = await this.diagramsRepository.findOne({
      where: { id: id },
    });
    if (!diagram) {
      throw new Error('Usuário não encontrado');
    }
    if (diagram.serialized_object) {
      diagram.serialized_object = deserializeFromBase64(
        diagram.serialized_object,
      );
    }
    return DiagramDTO.toDTO(diagram);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    const currentDate = new Date().toISOString();
    await this.diagramsRepository.update(id, {
      is_deleted: true,
      deleted_at: currentDate,
    });
  }

  async update(
    id: string,
    diagram: UpdateDiagramRequestDTO,
  ): Promise<DiagramDTO> {
    const diagramToUpdate = await this.findOne(id);
    if (diagram.serialized_object) {
      diagramToUpdate.serialized_object = serializeToBase64(
        diagram.serialized_object,
      );
    }
    await this.diagramsRepository.update(id, diagramToUpdate);
    return diagramToUpdate;
  }
}
