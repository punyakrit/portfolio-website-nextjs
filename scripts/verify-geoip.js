const fs = require('fs');
const path = require('path');

const geoipPath = path.join(__dirname, '..', 'node_modules', 'geoip-lite');
const dataPath = path.join(geoipPath, 'data', 'geoip-country.dat');

if (!fs.existsSync(dataPath)) {
  console.warn('⚠️  geoip-lite data files not found. Attempting to reinstall...');
  console.warn(`   Expected path: ${dataPath}`);
  
  if (fs.existsSync(geoipPath)) {
    console.warn('   geoip-lite package exists but data files are missing.');
    console.warn('   This may cause runtime errors. Please ensure geoip-lite is properly installed.');
  } else {
    console.warn('   geoip-lite package not found.');
  }
} else {
  console.log('✓ geoip-lite data files verified');
}
