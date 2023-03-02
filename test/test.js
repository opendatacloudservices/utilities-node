const {dollarList} = require('../build/index');
const {
  createFolders,
  nextFile,
  uniqueString,
  uniqueFolderList,
  next,
} = require('../build/files');
const fs = require('fs');

const testFiles = './tmp';
if (fs.existsSync(testFiles)) {
  fs.rmSync(testFiles, {recursive: true, force: true});
}
fs.mkdirSync(testFiles);

test('dollarList', async () => {
  expect(dollarList(1, 3)).toBe('$2,$3,$4');
});

test('uniqueString', async () => {
  const str = uniqueString(10);
  expect(str.length).toBe(10);
  expect(typeof str).toBe('string');
});

test('uniqueFolderList', async () => {
  const strs = uniqueFolderList(30, 10);
  expect(strs.length).toBe(30);
  expect(strs[0].length).toBe(10);
  expect(typeof strs[0]).toBe('string');
});

test('createFolders-and-files', async () => {
  createFolders(testFiles, 2, 10, 2);
  const l1 = fs.readdirSync(testFiles);
  expect(l1.length).toBe(2);
  const l2 = fs.readdirSync(testFiles + '/' + l1[0]);
  expect(l2.length).toBe(2);
  let l3 = fs.readdirSync(testFiles + '/' + l1[0] + '/' + l2[0]);
  expect(l3.length).toBe(0);
  for (let i = 0; i < 8; i += 1) {
    const nFile1 = next(testFiles, 2, 10, 2);
    const nFile2 = nextFile(testFiles, 2, 10, 2);
    expect(nFile1.substring(0, nFile1.length - 10)).toBe(
      nFile2.substring(0, nFile1.length - 10)
    );
    fs.writeFileSync(nFile1, '', 'utf-8');
  }
  l3 = fs.readdirSync(testFiles + '/' + l1[0] + '/' + l2[0]);
  expect(l3.length).toBe(2);
  expect(fs.existsSync(testFiles + '/' + l1[0] + '/.isFull')).toBe(true);

  // clean up
  fs.rmSync(testFiles, {recursive: true, force: true});
});
