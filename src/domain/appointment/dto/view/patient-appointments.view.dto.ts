import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PatientAppointmentsViewDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly date: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly cabinet: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly specializationname: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;
}
