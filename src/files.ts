import {readdirSync, mkdirSync} from 'fs';

const folderLimit = 30;
const folderNameLimit = 10;
const folderDepthLimit = 6;

const createFolders = (path: string, level = 1) => {
  const folders = uniqueFolderList();
  folders.forEach(f => {
    const newFolder = path + '/' + f;
    mkdirSync(newFolder);
    if (level < folderDepthLimit) {
      createFolders(newFolder);
    }
  });
};

const uniqueFolderList = (): string[] => {
  const folders: string[] = [];
  for (let f = 0; f < folderLimit; f += 1) {
    let folder = uniqueString();
    while (folders.includes(folder)) {
      folder = uniqueString();
    }
    folders.push(folder);
  }
  return folders;
};

const uniqueString = (): string => {
  let str = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz123456789'.split('');
  for (let i = 0; i < folderNameLimit; i += 1) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

const getPath = (path: string, folderIds: number[]): string => {
  let fullPath = path;
  for (let l = 0; l < folderDepthLimit; l += 1) {
    const folders = readdirSync(fullPath);
    fullPath += '/' + folders[folderIds[l]];
  }
  return fullPath;
};

const fileCount = (path: string): number => {
  return readdirSync(path).length;
};

export {createFolders, getPath, fileCount};
