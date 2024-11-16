import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FindOneParams } from 'src/interfaces/find-one-params.validation';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiagramDTO } from 'src/entities/diagram.entity';
import { DiagramsService } from 'src/providers/diagram.service';
import {
  CreateDiagramRequestDTO,
  UpdateDiagramRequestDTO,
} from 'src/interfaces/dto/diagrams/diagrams.request';

@ApiTags('diagrams')
@Controller('diagrams')
export class DiagramsController {
  constructor(private diagramsService: DiagramsService) {}

  @ApiResponse({ type: DiagramDTO })
  @Post()
  async create(
    @Body() createDiagramDto: CreateDiagramRequestDTO,
    @Res() res: Response,
  ) {
    const diagram = await this.diagramsService.create(createDiagramDto);
    return res.status(HttpStatus.CREATED).send(diagram);
  }

  @ApiResponse({ type: [DiagramDTO] })
  @Get()
  async findAll(@Res() res: Response) {
    const diagrams = await this.diagramsService.findAll();
    return res.status(HttpStatus.OK).send(diagrams);
  }

  @ApiResponse({ type: DiagramDTO })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async findOne(@Param() params: FindOneParams, @Res() res: Response) {
    const diagram = await this.diagramsService.findOne(params.id);
    return res.status(HttpStatus.OK).send(diagram);
  }

  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  async remove(@Param() params: FindOneParams, @Res() res: Response) {
    await this.diagramsService.remove(params.id);
    return res.status(HttpStatus.OK).send('Diagrama Desativado');
  }

  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: DiagramDTO })
  @Put(':id')
  async update(
    @Body() updateDiagramDto: UpdateDiagramRequestDTO,
    @Param() params: FindOneParams,
    @Res() res: Response,
  ) {
    const updatedDiagram = await this.diagramsService.update(
      params.id,
      updateDiagramDto,
    );
    return res.status(HttpStatus.OK).send(updatedDiagram);
  }
}
