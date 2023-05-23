import { IsNotEmpty } from 'class-validator';
import { IsNotExitsRule } from 'src/common/rules/is-not-exits.rule';
export class LoginDTO {
  @IsNotEmpty({ message: 'U is required' })
  @IsNotExitsRule('user', { message: '用户不存在' }, 'login')
  name: string;

  @IsNotEmpty({ message: 'P is required' })
  password: string;
}
