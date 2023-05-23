import { BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ValidationOptions, registerDecorator } from 'class-validator';
const psm = new PrismaClient();
export function IsNotExitsRule(
  table: string,
  validateOptions: ValidationOptions,
  type: any,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotExits',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validateOptions,
      validator: {
        async validate(value: any, args: any) {
          let findUser = await psm[table].findUnique({
            where: {
              name: value,
            },
          });
          if (table === 'user' && type == 'login') return Boolean(findUser);
          return !Boolean(findUser);
        },
      },
    });
  };
}
