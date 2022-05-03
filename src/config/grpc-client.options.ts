import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:8000',
    package: 'clinic',
    protoPath: join(__dirname, '../../grpc/grpc.proto'),
  },
};
