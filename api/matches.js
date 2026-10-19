export default async function handler(req, res) {
  const API_TOKEN = 'MyUlh-yVa4Kh4r50';
  const API_USER = 'تاكورت';
  
  const today = new Date().toISOString().split('T')[0];
  // استخدام نقطة نهاية المباريات اليومية (fixtures) لضمان ظهور جدول مباريات اليوم
  const targetUrl = `https://api.soccersapi.com/v2.2/fixtures/?user=${encodeURIComponent(API_USER)}&token=${API_TOKEN}&d=${today}`;

  try {
    const response = await fetch(targetUrl);
    const json = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      success: true,
      data: json.data || json.result || (Array.isArray(json) ? json : [])
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
