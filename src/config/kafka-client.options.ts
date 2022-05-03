import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaClientOptions: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'AppointmentsService',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'AppointmentsGroups',
      allowAutoTopicCreation: true,
    },
  },
};
