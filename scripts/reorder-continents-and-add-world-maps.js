const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/esim/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Kıta ID'leri ve sıralamaları (en üstte olacaklar)
const continentOrder = [
  'global',
  'north-america',
  'europa-plus',
  'asia',
  'africa',
  'oceania',
  'americas',
  'europe-lite',
  'balkans',
  'caribbean',
  'cis',
  'middle-east-africa',
  'middle-east-and-north-africa'
];

// Her kıta için dünya haritası görseli URL'leri
const worldMapImages = {
  'global': 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=800&h=400&fit=crop',
  'north-america': 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?w=800&h=400&fit=crop',
  'europa-plus': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop',
  'asia': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=400&fit=crop',
  'africa': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop',
  'oceania': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  'americas': 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?w=800&h=400&fit=crop',
  'europe-lite': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop',
  'balkans': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop',
  'caribbean': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=400&fit=crop',
  'cis': 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=800&h=400&fit=crop',
  'middle-east-africa': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop',
  'middle-east-and-north-africa': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop'
};

// Her kıta için worldMapImage property ekle
continentOrder.forEach(continentId => {
  const imageUrl = worldMapImages[continentId];
  if (imageUrl) {
    // Kıta tanımını bul ve worldMapImage ekle
    const continentPattern = new RegExp(
      `(id: "${continentId}",[\\s\\S]*?)(description: "[^"]*",)`,
      'g'
    );
    
    content = content.replace(continentPattern, (match, before, description) => {
      // Eğer zaten worldMapImage varsa, güncelle
      if (match.includes('worldMapImage:')) {
        return match.replace(/worldMapImage: "[^"]*",/g, `worldMapImage: "${imageUrl}",`);
      }
      // Yoksa ekle
      return before + description + `\n      worldMapImage: "${imageUrl}",`;
    });
  }
});

// Kıtaları en üste taşıma işlemi için regex pattern
// Bu işlem daha karmaşık, manuel olarak yapılmalı veya daha gelişmiş bir script gerekir
// Şimdilik sadece worldMapImage ekleyelim

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ World map images added to continents!');










