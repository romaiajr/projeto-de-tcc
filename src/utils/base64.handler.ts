const serializeToBase64 = (obj: any): string => {
  const jsonString = JSON.stringify(obj);
  const base64Encoded = Buffer.from(jsonString).toString('base64');
  return base64Encoded;
};

const deserializeFromBase64 = (base64String: string): any => {
  const jsonString = Buffer.from(base64String, 'base64').toString('utf-8'); // Decode Base64 to JSON string
  const obj = JSON.parse(jsonString); // Parse JSON string back to an object
  return obj;
};

export { serializeToBase64, deserializeFromBase64 };
