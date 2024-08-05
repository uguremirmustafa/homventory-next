interface JsonRes<T = unknown> {
  message: string;
  success: boolean;
  data?: T;
  dataList?: T[];
}
export function writeJson<T = unknown>({ message, success, data, dataList }: JsonRes<T>) {
  return {
    message,
    success,
    data,
    dataList,
  };
}

export function errorJson<T = undefined>(data: Omit<JsonRes<T>, 'success'>) {
  return writeJson<T>({ ...data, success: false });
}

export function successJson<T = undefined>(data: Omit<JsonRes<T>, 'success'>) {
  return writeJson<T>({ ...data, success: true });
}
