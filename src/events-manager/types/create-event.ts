import { EvnetType } from '@prisma/client';

export interface CreateEvent {
  priority: number;
  name: string;
  description: string;
  type: EvnetType;
}
