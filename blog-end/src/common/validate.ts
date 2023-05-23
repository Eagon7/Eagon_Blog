import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(errors: ValidationError[]): string[] {
    const messages = {};
    errors.forEach((error) => {
      messages[error.property] = Object.values(error.constraints)[0];
    });
    throw new HttpException(
      {
        code: 422,
        messages,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
// async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
//   console.log(value, metadata);
//   return await super.transform(value, metadata);
// }
// [
//   ValidationError {
//     target: LoginDTO { name: 'admin', password: '1233213' },
//     value: 'admin',
//     property: 'name',
//     children: [],
//     constraints: { isNotExits: 'User is exits' }
//   }
// ]
// protected mapChildrenToValidationErrors(
//   error: ValidationError,
//   parentPath?: string,
// ): ValidationError[] {
//   return super.mapChildrenToValidationErrors(error, parentPath);
// }
