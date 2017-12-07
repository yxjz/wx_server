const fs = require('fs');

function deleteall(path) {
  fs.access(path, (err) => {
      if (!err) {
        fs.readdir(path, 'utf8', (err, files) => {
          if (err) {
            console.log(err);
          } else {
            files.forEach(function (file, index) {
              const curPath = path + "/" + file;
              fs.stat(curPath, (err, stats) => {
                if (stats.isDirectory()) {
                  deleteall(curPath);
                } else {
                  fs.unlink(curPath, (err) => {
                    if (err) console.log(err);
                  });
                }
              });
            });
          }
        });
      }
    },
  );
};

module.exports = {
  deleteall,
};