import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagram } from 'src/entities/diagram.entity';
import { DiagramsService } from 'src/providers/diagram.service';
import { DiagramsController } from 'src/controllers/diagrams.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Diagram])],
  providers: [DiagramsService],
  controllers: [DiagramsController],
})
export class DiagramsModule {}
