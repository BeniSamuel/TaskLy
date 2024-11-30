import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tasks } from "src/entities/tasks.entity";
import { TaskController } from "./tasks.controller";
import { TaskService } from "./tasks.service";


@Module({
    imports: [TypeOrmModule.forFeature([Tasks])],
    controllers: [TaskController],
    providers: [TaskService],
    exports: []
})

export class TaskModule {};