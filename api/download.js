const axios = require('axios');

async function ttdl(url) {
  try {
    if (!url) return { status: false, message: "URL tidak didefinisikan!" };
    return await new Promise(async (resolve, reject) => {
      axios.post("https://savetik.co/api/ajaxSearch", `q=${url}&lang=en`, {
        headers: {
          'authority': 'savetik.co',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'origin': 'https://savetik.co',
          'referer': 'https://savetik.co/en/tiktok-photo-downloader',
          'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
          'x-requested-with': 'XMLHttpRequest'
        }
      }).then(raw => {
        const res = raw.data;
        if (!res.data) return reject("Gagal mengambil data");
        let images = Array.from(res?.data?.matchAll(/https:\/\/d\.tik-cdn\.com\/image([^"]*)/g), match => "https://d.tik-cdn.com/image" + match[1].replace("&amp;", "&"));
        let videos = Array.from(res?.data?.matchAll(/<a\s+onclick="showAd\(\)"\s+href="https:\/\/d\.tik-cdn\.com\/dl\/([^"]*)"/g), match => "https://d.tik-cdn.com/dl/" + match[1].replace("&amp;", "&"));
        if (!images || !videos) return reject("Gagal mengambil data");
        resolve({
          status: true,
          ...((images.length > 0) ? { images } : { videos })
        });
      }).catch(err => reject(err));
    });
  } catch (e) {
    return { status: false, message: e };
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: false, message: "Metode tidak diizinkan" });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ status: false, message: "URL tidak diberikan" });
  }

  try {
    const data = await ttdl(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
