export function writeJson(message: string, success: boolean) {
  return {
    message,
    success,
  };
}

export function errorJson(message: string) {
  return writeJson(message, false);
}

export function successJson(message: string) {
  return writeJson(message, true);
}
