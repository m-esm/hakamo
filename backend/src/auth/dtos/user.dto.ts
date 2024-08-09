import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { RegisterUserDto } from './register-user.dto';

export class UserDto extends RegisterUserDto {
  @ApiProperty({
    readOnly: true,
    required: false,
    nullable: true,
  })
  @Expose()
  lastLogin?: Date;
}
