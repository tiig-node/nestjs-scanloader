import {
  DynamicModule,
  ForwardReference,
  Module,
  // ModuleMetadata,
  Provider,
  Type,
} from "@nestjs/common";
import { sync } from "fast-glob";
import { join, basename } from "path";

export interface ScanOptions {
  name?: string;
  basePath: string;
  modulesPaths?: string[];
  imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
  ignores?: string[];
  providers?: Provider<any>[];
  export?: boolean;
}

interface ILoaderResult {
  modules: any[];
  // controllers: Type<any>[];
}

export interface IScanOptions {
  basePath: string;
  modulesPaths?: string[];
  ignores?: string[];
}

const ignoredFiles = ["**/*.d.ts', '**/*.js.map"];

// const logger = new Logger("ScanLoaderModule", {
//   timestamp: true,
// });

const scanLoader = (
  pathsModules: string[],
  basePath: string,
  ignores: string[],
  name: string,
): ILoaderResult => {
  const modules: any[] = [];
  if (pathsModules.length > 0) {
    // logger.log("Scanning Modules...", name);
    const fileProviders: string[] = pathsModules
      .map((path) =>
        sync(join(basePath, path).replace(/\\/g, "/"), {
          ignore: [...ignoredFiles, ...ignores],
          absolute: true,
        }),
      )
      .reduce((acc, val) => [...acc, ...val], []);

    for (const providersFile of fileProviders) {
      // logger.log("Scannng file " + basename(providersFile), name);
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const s = require(providersFile);
      const modulesRequire: any[] = Object.values(s);
      for (const module of modulesRequire) {
        // logger.log(`${module.name} loaded`, name);
        modules.push(module as any);
      }
    }
  }

  return {
    modules,
  };
};

@Module({})
export class ScanLoaderModule {
  static forRoot (opts: ScanOptions): DynamicModule {
    const defProviders = opts.providers || [];
    const defImports = opts.imports || [];
    const defIgnores = opts.ignores || [];

    // logger.log("Start scanning...", `${this.name}-${opts.name}`);

    const { modules } = scanLoader(
      opts.modulesPaths || [],
      opts.basePath,
      defIgnores,
      `${this.name}-${opts.name}`,
    );

    // logger.log("Scan sucessfull", `${this.name}-${opts.name}`);

    // return []; // modules;
    return {
      controllers: [],
      module: ScanLoaderModule,
      providers: [...defProviders],
      imports: [...modules, ...defImports],
      exports: opts.export
        ? [...modules, ...defProviders, ...defImports]
        : undefined,
    } as DynamicModule;
  }
}

// export function ScanModule(
//   metadata: ModuleMetadata & IScanOptions,
// ): ClassDecorator {
//   return (target: Function) => {
//     const {
//       controllersPaths,
//       providersPaths,
//       basePath,
//       ignores,
//       ...nestModuleMetadata
//     } = metadata;
//     const { controllers, providers } = scanLoader(
//       providersPaths || [],
//       controllersPaths || [],
//       basePath,
//       ignores || [],
//       ScanLoaderModule.name + '-' + target.name,
//     );
//     const finalMetadata: ModuleMetadata = {
//       ...nestModuleMetadata,
//       controllers: [...(nestModuleMetadata.controllers || []), ...controllers],
//       providers: [...(nestModuleMetadata.providers || []), ...providers],
//     };
//     Module(finalMetadata)(target);
//   };
// }
