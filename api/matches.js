export default async function handler(req, res) {
  const API_TOKEN = 'MyUlh-yVa4Kh4r50';
  const API_USER = 'تاكورت';
  
  const targetUrl = `https://api.soccersapi.com/v2.2/livescores/?user=${encodeURIComponent(API_USER)}&token=${API_TOKEN}&t=list`;

  try {
    const response = await fetch(targetUrl);
    const json = await response.json();
    
    // التحقق من بنية البيانات وإرسالها بالشكل الذي يتوقعه الموقع
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      success: true,
      data: json.data || json.result || (Array.isArray(json) ? json : [])
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
