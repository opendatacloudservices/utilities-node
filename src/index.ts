import * as files from './files';

export const dollarList = (start: number, length: number): string => {
  const r: string[] = [];

  for (let i = start; i < start + length; i += 1) {
    r.push(`$${i + 1}`);
  }

  return r.join(',');
};

export {files};
