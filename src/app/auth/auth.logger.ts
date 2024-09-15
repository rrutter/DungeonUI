export class CustomOAuthLogger {
  debug(...args: any[]): void {
    console.debug('OAuth Debug:', ...args);
  }
  info(...args: any[]): void {
    console.info('OAuth Info:', ...args);
  }
  warn(...args: any[]): void {
    console.warn('OAuth Warning:', ...args);
  }
  error(...args: any[]): void {
    console.error('OAuth Error:', ...args);
  }
}
