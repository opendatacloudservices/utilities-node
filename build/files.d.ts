declare const createFolders: (path: string, level?: number) => void;
declare const getPath: (path: string, folderIds: number[]) => string;
declare const fileCount: (path: string) => number;
export { createFolders, getPath, fileCount };
