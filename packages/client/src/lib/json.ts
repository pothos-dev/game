export function prettyJson(obj: any): string {
  if (typeof obj == "string") {
    return `"${obj}"`
  }
  if (typeof obj == "number") {
    return obj.toString()
  }
  if (typeof obj == "boolean") {
    return obj.toString()
  }
  if (obj == null) {
    return "null"
  }
  if (Array.isArray(obj)) {
    return `[${obj.map(prettyJson).join(", ")}]`
  }
  if (typeof obj == "object") {
    return `{${Object.entries(obj)
      .map(([key, value]) => `${key}: ${prettyJson(value)}`)
      .join(", ")}}`
  }
  return obj.toString()
}
