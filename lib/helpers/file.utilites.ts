import * as fs from "fs";

export async function deleteDirectory(directoryPath: string): Promise<void> {
  if (fs.existsSync(directoryPath)) {
    const files = await fs.promises.readdir(directoryPath);
    await Promise.all(
      files.map(async (file) => {
        const filePath = `${directoryPath}/${file}`;
        if ((await fs.promises.lstat(filePath)).isDirectory()) {
          await deleteDirectory(filePath);
        } else {
          await fs.promises.unlink(filePath);
        }
      })
    );
    await fs.promises.rmdir(directoryPath);
    console.log(`Директория ${directoryPath} успешно удалена.`);
  } else {
    console.log(`Директория ${directoryPath} не существует.`);
  }
}

export async function getFileSize(filePath: string): Promise<number> {
  try {
    const stats = await fs.promises.stat(filePath);
    return stats.size;
  } catch (error) {
    throw new Error(`Ошибка при получении размера файла: ${error.message}`);
  }
}
