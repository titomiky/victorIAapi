import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class CopyViewsService {
  constructor() {
    this.copyViews();
  }

  async copyViews() {
    try {
      await fs.copy('src/views', 'dist/views');
      console.log('La carpeta views se copió correctamente a dist/views');
    } catch (error) {
      console.error('Error al copiar la carpeta views:', error);
    }
  }
}
