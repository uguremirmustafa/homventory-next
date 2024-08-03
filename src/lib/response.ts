interface JsonRes<T = unknown> {
  message: string;
  success: boolean;
  data?: T;
  dataList?: T[];
}
export function writeJson({ message, success, data, dataList }: JsonRes) {
  return {
    message,
    success,
    data,
    dataList,
  };
}

export function errorJson(data: Omit<JsonRes, 'success'>) {
  return writeJson({ ...data, success: false });
}

export function successJson(data: Omit<JsonRes, 'success'>) {
  return writeJson({ ...data, success: true });
}
