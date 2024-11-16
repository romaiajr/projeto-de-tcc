import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FindOneParams } from 'src/interfaces/find-one-params.validation';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiagramDTO } from 'src/entities/diagram.entity';
import { DiagramsService } from 'src/providers/diagram.service';
import {
  CreateDiagramRequestDTO,
  UpdateDiagramRequestDTO,
} from 'src/interfaces/dto/diagrams/diagrams.request';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('diagrams')
@UseGuards(AuthGuard('jwt'))
@Controller('diagrams')
export class DiagramsController {
  constructor(private diagramsService: DiagramsService) {}

  @ApiResponse({ type: DiagramDTO })
  @Post()
  async create(
    @Body() createDiagramDto: CreateDiagramRequestDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req.user['userId'];
    const diagram = await this.diagramsService.create(createDiagramDto, userId);
    return res.status(HttpStatus.CREATED).send(diagram);
  }

  @ApiResponse({ type: [DiagramDTO] })
  @Get()
  async findAll(@Res() res: Response, @Req() req: Request) {
    const userId = req.user['userId'];
    const diagrams = await this.diagramsService.findAll(userId);
    return res.status(HttpStatus.OK).send(diagrams);
  }

  @ApiResponse({ type: DiagramDTO })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async findOne(
    @Param() params: FindOneParams,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req.user['userId'];
    const diagram = await this.diagramsService.findOne(params.id, userId);
    return res.status(HttpStatus.OK).send(diagram);
  }

  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  async remove(
    @Param() params: FindOneParams,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req.user['userId'];
    await this.diagramsService.remove(params.id, userId);
    return res.status(HttpStatus.OK).send('Diagrama Desativado');
  }

  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: DiagramDTO })
  @Put(':id')
  async update(
    @Body() updateDiagramDto: UpdateDiagramRequestDTO,
    @Param() params: FindOneParams,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req.user['userId'];
    const updatedDiagram = await this.diagramsService.update(
      params.id,
      userId,
      updateDiagramDto,
    );
    return res.status(HttpStatus.OK).send(updatedDiagram);
  }
}
