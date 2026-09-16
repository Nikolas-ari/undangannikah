import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGE_DIR = path.join(__dirname, 'public', 'assets', 'images');
const QUALITY = 75;
const MAX_WIDTH = 1920;

async function compressImages() {
  console.log('🖼️  Mulai kompres gambar...\n');

  const files = fs.readdirSync(IMAGE_DIR).filter(f =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  if (files.length === 0) {
    console.log('❌ Tidak ada gambar ditemukan di:', IMAGE_DIR);
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const filePath = path.join(IMAGE_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const sizeBefore = fs.statSync(filePath).size;
    totalBefore += sizeBefore;

    const tempPath = filePath + '.tmp';

    try {
      let sharpInstance = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

      if (ext === '.png') {
        await sharpInstance.png({ quality: QUALITY, compressionLevel: 8 }).toFile(tempPath);
      } else {
        await sharpInstance.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tempPath);
      }

      fs.renameSync(tempPath, filePath);

      const sizeAfter = fs.statSync(filePath).size;
      totalAfter += sizeAfter;

      const saved = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
      const beforeMB = (sizeBefore / 1024 / 1024).toFixed(2);
      const afterMB = (sizeAfter / 1024 / 1024).toFixed(2);

      console.log(`✅ ${file}`);
      console.log(`   ${beforeMB} MB → ${afterMB} MB (hemat ${saved}%)\n`);

    } catch (err) {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      console.log(`⚠️  Gagal kompres ${file}: ${err.message}\n`);
    }
  }

  const totalBeforeMB = (totalBefore / 1024 / 1024).toFixed(2);
  const totalAfterMB = (totalAfter / 1024 / 1024).toFixed(2);
  const totalSaved = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);

  console.log('='.repeat(50));
  console.log(`📊 TOTAL: ${totalBeforeMB} MB → ${totalAfterMB} MB`);
  console.log(`💾 Hemat: ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (${totalSaved}%)`);
  console.log('✨ Selesai! Sekarang bisa push ke GitHub.');
}

compressImages();
