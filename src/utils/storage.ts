// 本地存储工具类
class Storage {
  private prefix: string;

  constructor(prefix = 'app_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  // 设置存储
  set(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(this.getKey(key), serializedValue);
    } catch (error) {
      console.error('Storage set error:', error);
    }
  }

  // 获取存储
  get<T = any>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (item === null) {
        return defaultValue ?? null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue ?? null;
    }
  }

  // 删除存储
  remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  // 清空所有带前缀的存储
  clear(): void {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith(this.prefix)
    );
    keys.forEach(key => localStorage.removeItem(key));
  }

  // 检查是否存在
  has(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null;
  }
}

// 创建默认实例
export const storage = new Storage();

// 专用存储实例
export const userStorage = new Storage('user_');
export const settingsStorage = new Storage('settings_');

export default Storage; 