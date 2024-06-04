import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController]
})
export class HealthModule {}

// docker push mihaibln/iam_ernterprise_container_repo:tagname