export function createId(prefix: string): string {
  return prefix + ":" + Math.random().toString(36).substring(2, 15)
}
