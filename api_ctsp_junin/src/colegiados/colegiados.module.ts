import { Module } from '@nestjs/common';
import { ColegiadosController } from './colegiados.controller';
import { ColegiadosService } from './colegiados.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ColegiadosController],
    providers: [ColegiadosService],
})
export class ColegiadosModule {} 