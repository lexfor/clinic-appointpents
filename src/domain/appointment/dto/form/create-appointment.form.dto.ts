import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateAppointmentFormDto {
  @ApiModelProperty()
  @IsString()
  @IsDateString()
  @IsNotEmpty()
  readonly date: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly complaints?: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly patientID: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly doctorID: string;
}
