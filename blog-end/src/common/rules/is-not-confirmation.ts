import { BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ValidationOptions, registerDecorator } from 'class-validator';
const psm = new PrismaClient();
export function IsNotConfirmation(validateOptions: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotConfirmation',
      target: object.constructor,
      propertyName: propertyName,
      options: validateOptions,
      validator: {
        async validate(value: any, args: any) {
          return value === args.object['password_confirmation'];
        },
      },
    });
  };
}
