
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTagParam {
  @IsNotEmpty()
  @IsString()
  tag: string;
}
