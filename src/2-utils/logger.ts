import fsPromises from 'fs/promises';

export const logger = async (msg: string): Promise<void> => {
  const now = new Date();
  const line = `${now.toLocaleString()} ${msg}\n ------------------------------------`;
  await fsPromises.appendFile("./logger.txt", line);
}