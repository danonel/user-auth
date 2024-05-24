import { CONFIG } from '@/constants'

export type BaseErrorInterface<T> = {
  errorType: T
  data?: any
}

export class BaseError extends Error {
  verbose = CONFIG.VERBOSE_ERRORS || false
  constructor(public message: string, public statusCode: number, public payload: any) {
      super(message);
      this.name = this.constructor.name;
      this.payload = payload
      this.logError();
  }

  private logError(): void {
      console.error(`
        [${new Date().toISOString()}] ${this.name} (${this.statusCode}): ${this.message} 
        ${this.verbose ? ` [${this.payload}]` : ""}
      `);
  }
}