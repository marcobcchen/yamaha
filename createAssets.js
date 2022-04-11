const fs = require('fs');
const path = require('path');
const assetsFile = './assets.json';
const assetsPath = './images/';
const files = [];

function visit(rootPath){
  // 讀取資料夾裡的檔案
  let filenames = fs.readdirSync(rootPath);
  filenames.forEach(file => {
    let childPath = path.join(rootPath, file);
    fs.stat(childPath, (err, stats) => {
      if(!err && stats.isDirectory()){
        // 遞迴方式往子目錄找檔案
        visit(`${rootPath}${file}/`);
      }
      return;
    });
    // 將檔案加到處理成需要的格式並加入陣列
    addFile(rootPath, file);
  });
  // 將處理好格式的檔案陣列寫入assets.json
  write(files);
}

function addFile(filePath, file){
  // 取副檔名
  let ext = path.extname(file);
  // 取檔案大小
  let size = getFilesizeInBytes(`${filePath}${file}`);
  let temp = {};

  // 處理jpg、png、gif等格式
  if (ext === '.jpg' || ext === '.JPG' || ext === '.jpeg' || ext === '.JPEG' || ext === '.png' || ext === '.PNG' || ext === '.gif' || ext === '.GIF') {
    temp = {
      source: `${filePath}${file}`,
      type: 'IMAGE',
      size: size
    }
    files.push(temp);
  } 
  // 處理svg等格式
  if (ext === '.svg' || ext === '.SVG') {
    temp = {
      source: {
        svg: `${filePath}${file}`
      },
      type: 'IMAGE',
      size: size
    }
    files.push(temp);
  }
  return;
}

function getFilesizeInBytes(filename) {
  let stats = fs.statSync(filename);
  let fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

function write(files){
  let temp = {files: files};
  fs.writeFile(assetsFile, JSON.stringify(temp, null, 2), (err) => {
    if(err){
      console.log(err);
      return;
    }
    console.log('assets json creation completed');
  });
}

visit(assetsPath);