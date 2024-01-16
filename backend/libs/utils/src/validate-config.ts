import { ClassConstructor } from 'class-transformer';

function validateConfig<T extends object>(
  config: Record<string, unknown>,
  envVarClass: ClassConstructor<T>,
) {


}
