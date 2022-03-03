import { ScanModule } from '..';

@ScanModule({
    basePath: __dirname,
    controllersPaths: ['/controllers/*.ts'],
    providersPaths: ['/services/*.ts'],
})
export class TestModule {}
