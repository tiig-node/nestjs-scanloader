<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) module for autoload providers and controllers.

## Installation

```bash
$ npm install nestjs-scanloader
```

## Example

```TS
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ScanLoaderModule } from 'nestjs-scanloader';

@Module({
    imports: [
        ScanLoaderModule.register({
            name: 'test',
            basePath: __dirname,
            controllersPaths: ['/controllers/**/*.controller.js'],
            providersPaths: ['/services/**/*.service.js'],
            imports: [JwtModule.register({})],
        }),
    ],
})
export class AppModule {}
```

## Example using module decorator

```TS
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ScanModule } from 'nestjs-scanloader';


@ScanModule({
    basePath: __dirname,
    controllersPaths: ['/controllers/**/*.controller.*'],
    providersPaths: ['/services/**/*.service.*'],
    imports: [JwtModule.register({})],
})
export class AppModule {}
```

## Register options

```TS
export interface ScanOptions {
    name: string;
    basePath: string;
    controllersPaths?: string[];
    providersPaths?: string[];
    imports?: Array<
        Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    >;
    ignores?: string[];
    providers?: Provider<any>[];
    export?: boolean;
}
```

-   name: identifier of current register for logs.
-   basePath: url root for controllersPaths and providersPaths.
-   controllersPaths: list of [FastGlob](https://www.npmjs.com/package/fast-glob) expressions for match controllers.
-   providersPaths: list of [FastGlob](https://www.npmjs.com/package/fast-glob) expressions for match providers.
-   imports: list of dependecies modules for autolad provides and controllers.
-   ignores: list of [FastGlob](https://www.npmjs.com/package/fast-glob) expressions for ignore during scan.
-   export: if autoload providers need to be exported.

## Module decorator options

Extends default metadata for Module Nest decorator

```TS
export interface IScanOptions {
    basePath: string;
    controllersPaths?: string[];
    providersPaths?: string[];
    ignores?: string[];
}
```

-   basePath: url root for controllersPaths and providersPaths.
-   controllersPaths: list of [FastGlob](https://www.npmjs.com/package/fast-glob) expressions for match controllers.
-   providersPaths: list of [FastGlob](https://www.npmjs.com/package/fast-glob) expressions for match providers.
-   ignores: list of [FastGlob](https://www.npmjs.com/package/fast-glob) expressions for ignore during scan.

## License

Nest is [MIT licensed](LICENSE).
