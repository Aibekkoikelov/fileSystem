function logFile(a, b, c) {
  const fileSize = c / 1000000;
  const fileSizeString =
    fileSize.toFixed(2) > 10
      ? "Превышен максимальный размер файла больше 10 МВ"
      : fileSize.toFixed(2) + " Мб";
  console.log = function (start, end, fileSizeString) {
    process.stdout.write(
      `File create time: ${start}\nFile finished: ${end} \nDirectory size: ${fileSizeString}\n`
    );
  };
  console.log(a, b, fileSizeString);
}

module.exports = logFile;
