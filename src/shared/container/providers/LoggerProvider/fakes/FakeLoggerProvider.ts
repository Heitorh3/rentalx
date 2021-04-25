import LoggerProvider from '../models/ILoggerProvider';

class FakeLoggerProvider implements LoggerProvider {
  log(level: string, message: string, metadata?: object): void {}
}
export default FakeLoggerProvider;
