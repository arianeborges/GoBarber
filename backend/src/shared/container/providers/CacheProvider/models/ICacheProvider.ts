export default interface ICacheProvider {
  recover<T>(key: string): Promise<T | null>;
  save(key: string, value: any): Promise<void>;
  invalidate(key: string): Promise<void>;
  invalidadePrefix(prefix: string): Promise<void>;
}
