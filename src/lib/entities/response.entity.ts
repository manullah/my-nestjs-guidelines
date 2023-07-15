import { HttpStatus } from '@nestjs/common';

export class ResponseEntity {
  constructor(partial: Partial<ResponseEntity>) {
    Object.assign(this, partial);
  }

  statusCode: HttpStatus;
  message?: 'success' | 'created' | 'updated' | 'deleted';
  data: any;
  items?: any[];
  meta?: any;
}
