import { ApiProperty } from '@nestjs/swagger';
import { RegisterUserDto } from './register-user.dto';
import { Expose } from 'class-transformer';

export class RegisteredUserDto extends RegisterUserDto {
  @ApiProperty({
    description: 'Temporary password needs to change on the first use',
  })
  @Expose()
  temporaryPassword: string;
}
