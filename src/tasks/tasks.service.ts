import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { TaskDto } from "src/dtos/tasks.dto";
import { Tasks } from "src/entities/tasks.entity";
import { Repository } from "typeorm";


@Injectable()
export class TaskService {
    constructor ( @InjectRepository(Tasks) private taskRepository: Repository<Tasks>) {}

    createTask ( taskInform: TaskDto ): Promise<Tasks> {
        const newTask = this.taskRepository.create(taskInform);
        return this.taskRepository.save(newTask);
    }

    getTask ( ): Promise<Tasks[]> {
        return this.taskRepository.find();
    }

    getTaskById ( id: number ): Promise<Tasks> {
        return this.taskRepository.findOne({ where: { id: id }}); 
    }

    updateTask ( id: number, taskInform: TaskDto  ): Promise<Tasks> {
        this.taskRepository.update(id, taskInform);
        return this.taskRepository.findOne({ where: { id: id }})
    }

    deleteTask ( id: number ) {
        this.taskRepository.delete(id);
        return { message: "Task Deleted!!" }
    }
}