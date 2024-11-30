import { Body, Controller, Post, Get, Param, Put, Delete } from "@nestjs/common";
import { TaskService } from "./tasks.service";
import { TaskDto } from "src/dtos/tasks.dto";

@Controller("tasks")
export class TaskController {
    constructor ( private taskService: TaskService ) {};

    @Post()
    async createTask ( @Body() taskInform: TaskDto ) {
        const newTask = await this.taskService.createTask(taskInform);
        return { message: "Created Task", task: newTask };
    }

    @Get()
    async getTask () {
        return await this.taskService.getTask();
    }

    @Get(":id")
    async getTaskById ( @Param('id') id: string ) {
        const task = await this.taskService.getTaskById( Number(id) );
        return task ? task : "Task Not Found!!";
    }

    @Put(":id")
    async updateTask ( @Param('id') id: string, @Body() taskInform: TaskDto ) {
        const uTask = await this.taskService.updateTask( Number(id), taskInform );
        return uTask ? { message: "Updated Successfully 🎉🎉", task: uTask } : "Task not found";
    }

    @Delete(":id")
    async deleteTask ( @Param('id')  id: string ) {
        return this.taskService.deleteTask(Number(id));
    }

}