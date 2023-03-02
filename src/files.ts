import {readdirSync, mkdirSync, existsSync, lstatSync, writeFileSync} from 'fs';

const createFolders = (
  path: string,
  folderLimit = 30,
  folderNameLimit = 10,
  folderDepthLimit = 4,
  level = 1
) => {
  if (!existsSync(path)) {
    throw new Error(`Path ${path} does not exist.`);
  }
  const folders = uniqueFolderList(folderLimit, folderNameLimit);
  folders.forEach(f => {
    const newFolder = path + '/' + f;
    mkdirSync(newFolder);
    if (level < folderDepthLimit) {
      createFolders(
        newFolder,
        folderLimit,
        folderNameLimit,
        folderDepthLimit,
        level + 1
      );
    }
  });
};

const uniqueFolderList = (folderLimit = 30, folderNameLimit = 10): string[] => {
  const folders: string[] = [];
  for (let f = 0; f < folderLimit; f += 1) {
    let folder = uniqueString(folderNameLimit);
    while (folders.includes(folder)) {
      folder = uniqueString();
    }
    folders.push(folder);
  }
  return folders;
};

const uniqueString = (folderNameLimit = 10): string => {
  let str = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz123456789'.split('');
  for (let i = 0; i < folderNameLimit; i += 1) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

const nextFile = (
  path: string,
  folderLimit = 30,
  folderNameLimit = 10,
  folderDepthLimit = 4
): string => {
  if (!existsSync(path)) {
    throw new Error(`Path ${path} does not exist.`);
  }
  const nFile = next(path, folderLimit, folderNameLimit, folderDepthLimit);
  if (nFile === null) {
    throw new Error('Could not determin next file.');
  }
  return nFile;
};

const next = (
  path: string,
  folderLimit = 30,
  folderNameLimit = 10,
  folderDepthLimit = 4,
  level = 1
): string | null => {
  if (!existsSync(path)) {
    throw new Error(`Path ${path} does not exist.`);
  }
  if (existsSync(path + '/.isFull')) {
    // no reason to dig deeper, this path is full
    return null;
  }
  if (level > folderDepthLimit) {
    if (readdirSync(path).length < folderLimit) {
      return path + '/' + uniqueString(folderNameLimit);
    } else {
      return null;
    }
  } else {
    let n: string | null = null;
    const files = readdirSync(path);
    for (let f = 0; f < files.length && n === null; f++) {
      const file = path + '/' + files[f];
      if (n === null && lstatSync(file).isDirectory()) {
        n = next(
          file,
          folderLimit,
          folderNameLimit,
          folderDepthLimit,
          level + 1
        );
      }
    }
    if (n === null) {
      // looks like this folder is full
      // let's mark as full and never return
      writeFileSync(path + '/.isFull', '', 'utf-8');
    }
    return n;
  }
};

export {createFolders, nextFile, uniqueString, uniqueFolderList, next};
