import { EvnetType } from '@prisma/client';

export interface Event {
  priority: number;
  name: string;
  description: string;
  type: EvnetType;
}
