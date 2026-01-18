const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeFavicon() {
  const inputPath = path.join(__dirname, '../app/icon.png');
  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../app');

  console.log('🎨 Favicon Optimizasyonu Başlıyor...\n');

  try {
    // Orijinal görseli yükle
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`📐 Orijinal Boyut: ${metadata.width}x${metadata.height}`);

    // Görseli oku ve analiz et
    const { data, info } = await image
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    // Padding'i tespit et - siyah (0,0,0) veya çok koyu pikselleri bul
    let minX = info.width;
    let minY = info.height;
    let maxX = 0;
    let maxY = 0;
    let hasContent = false;

    // Logo alanını bul (siyah olmayan pikseller)
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        // Siyah değilse ve opak ise (logo parçası)
        if (a > 0 && (r > 10 || g > 10 || b > 10)) {
          hasContent = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!hasContent) {
      console.error('❌ Logo alanı bulunamadı!');
      return;
    }

    // Padding'i hesapla
    const paddingX = Math.max(minX, info.width - maxX - 1);
    const paddingY = Math.max(minY, info.height - maxY - 1);
    const contentWidth = maxX - minX + 1;
    const contentHeight = maxY - minY + 1;

    console.log(`📦 Tespit Edilen Padding: X=${paddingX}px, Y=${paddingY}px`);
    console.log(`📏 Logo Boyutu: ${contentWidth}x${contentHeight}`);

    // Logo'yu crop et - padding'i TAMAMEN kaldır (sadece 2px bırak kenarlarda)
    const paddingToKeep = 2; // Sadece 2px padding
    const left = Math.max(0, minX - paddingToKeep);
    const top = Math.max(0, minY - paddingToKeep);
    const croppedWidth = Math.min(info.width - left, contentWidth + paddingToKeep * 2);
    const croppedHeight = Math.min(info.height - top, contentHeight + paddingToKeep * 2);

    // Logo'yu %200 büyüt - canvas'ın %95'ini doldur
    const scaleFactor = 0.95; // Canvas'ın %95'ini doldur

    console.log(`\n✨ Logo'yu crop edip canvas'ın %${scaleFactor * 100}'ini dolduracak şekilde büyütüyoruz...\n`);

    // Farklı boyutlarda favicon'lar oluştur
    const sizes = [
      { size: 16, name: 'icon-16.png' },
      { size: 32, name: 'icon-32.png' },
      { size: 48, name: 'icon-48.png' },
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 512, name: 'icon.png' },
    ];

    // Crop edilmiş görseli hazırla
    const croppedImage = image.extract({
      left: Math.floor(left),
      top: Math.floor(top),
      width: Math.floor(croppedWidth),
      height: Math.floor(croppedHeight),
    });

    for (const { size, name } of sizes) {
      // Önce crop et, sonra resize yap - canvas'ın %95'ini doldur
      const targetLogoSize = Math.floor(size * scaleFactor);
      await croppedImage
        .clone()
        .resize(targetLogoSize, targetLogoSize, {
          fit: 'cover',
          position: 'center',
          kernel: sharp.kernel.lanczos3,
        })
        .extend({
          top: Math.floor((size - targetLogoSize) / 2),
          bottom: Math.ceil((size - targetLogoSize) / 2),
          left: Math.floor((size - targetLogoSize) / 2),
          right: Math.ceil((size - targetLogoSize) / 2),
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        })
        .resize(size, size)
        .png({ quality: 100, compressionLevel: 9 })
        .toFile(path.join(publicDir, name));

      console.log(`✅ ${name} (${size}x${size}) oluşturuldu → public/${name}`);
    }

    // app/icon.png için 512x512 oluştur (önce geçici dosyaya yaz)
    const tempIconPath = path.join(appDir, 'icon-temp.png');
    const targetLogoSize512 = Math.floor(512 * scaleFactor);
    await croppedImage
      .clone()
      .resize(targetLogoSize512, targetLogoSize512, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3,
      })
      .extend({
        top: Math.floor((512 - targetLogoSize512) / 2),
        bottom: Math.ceil((512 - targetLogoSize512) / 2),
        left: Math.floor((512 - targetLogoSize512) / 2),
        right: Math.ceil((512 - targetLogoSize512) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .resize(512, 512)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(tempIconPath);
    
    // Geçici dosyayı asıl dosyayla değiştir
    const finalIconPath = path.join(appDir, 'icon.png');
    if (fs.existsSync(finalIconPath)) {
      fs.unlinkSync(finalIconPath);
    }
    fs.renameSync(tempIconPath, finalIconPath);

    console.log(`✅ icon.png (512x512) oluşturuldu → app/icon.png`);

    // favicon.ico için 32x32 PNG'yi kopyala (basit bir çözüm)
    // Not: Gerçek .ico formatı için toIco() kullanılabilir ama bu basit bir çözüm
    const targetLogoSize32 = Math.floor(32 * scaleFactor);
    await croppedImage
      .clone()
      .resize(targetLogoSize32, targetLogoSize32, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3,
      })
      .extend({
        top: Math.floor((32 - targetLogoSize32) / 2),
        bottom: Math.ceil((32 - targetLogoSize32) / 2),
        left: Math.floor((32 - targetLogoSize32) / 2),
        right: Math.ceil((32 - targetLogoSize32) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-temp.png'));

    console.log(`\n🎉 Favicon optimizasyonu tamamlandı!`);
    console.log(`\n📋 Oluşturulan dosyalar:`);
    console.log(`   - public/icon-16.png (16x16)`);
    console.log(`   - public/icon-32.png (32x32)`);
    console.log(`   - public/icon-48.png (48x48)`);
    console.log(`   - public/apple-touch-icon.png (180x180)`);
    console.log(`   - public/icon.png (512x512)`);
    console.log(`   - app/icon.png (512x512)`);
    console.log(`\n⚠️  Not: favicon.ico dosyasını manuel olarak güncellemeniz gerekebilir.`);
    console.log(`   Geçici olarak favicon-temp.png oluşturuldu.`);

  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

optimizeFavicon();
