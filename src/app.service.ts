import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return 'Welcome on Taskly 👌👌👌👌🔥🔥';
  }
}
