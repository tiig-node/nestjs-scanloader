import { Controller } from '@nestjs/common';
import { Service1 } from '../services/service1';

@Controller()
export class Controller1 {
    constructor(private readonly service1: Service1) {}
}
