import { Test, TestingModule } from '@nestjs/testing';
import { Controller1 } from './controllers/controller1';
import { Controller2 } from './controllers/controller2';
import { Service1 } from './services/service1';
import { TestModule } from './test.module';

describe('Module Loader', () => {
    it('Load Components', async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TestModule],
        }).compile();
        const app = await moduleFixture.createNestApplication();
        await app.init();
        expect(
            moduleFixture.select(TestModule).get(Controller1),
        ).not.toBeNull();
        expect(
            moduleFixture.select(TestModule).get(Controller2),
        ).not.toBeNull();
        expect(moduleFixture.select(TestModule).get(Service1)).not.toBeNull();
    });
});
