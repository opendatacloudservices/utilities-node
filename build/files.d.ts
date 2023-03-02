declare const createFolders: (path: string, folderLimit?: number, folderNameLimit?: number, folderDepthLimit?: number, level?: number) => void;
declare const uniqueFolderList: (folderLimit?: number, folderNameLimit?: number) => string[];
declare const uniqueString: (folderNameLimit?: number) => string;
declare const nextFile: (path: string, folderLimit?: number, folderNameLimit?: number, folderDepthLimit?: number) => string;
declare const next: (path: string, folderLimit?: number, folderNameLimit?: number, folderDepthLimit?: number, level?: number) => string | null;
export { createFolders, nextFile, uniqueString, uniqueFolderList, next };
