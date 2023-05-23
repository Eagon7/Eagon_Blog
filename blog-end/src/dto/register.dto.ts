import { IsNotEmpty } from 'class-validator';
import { IsNotConfirmation } from 'src/common/rules/is-not-confirmation';
import { IsNotExitsRule } from 'src/common/rules/is-not-exits.rule';

export class RegisterDTO {
  @IsNotExitsRule('user', { message: 'User is exist' }, 'register')
  @IsNotEmpty({ message: 'U is required' })
  name: string;

  @IsNotEmpty({ message: 'P is required' })
  @IsNotConfirmation({ message: 'P is not confirmation' })
  password: string;
}
