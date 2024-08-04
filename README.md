# TikTok Video Downloader API

API ini memungkinkan Anda untuk mengunduh gambar atau video dari TikTok dengan memasukkan URL video TikTok.

## Endpoint

- `POST https://api-doktik.vercel.app/api/download`

## Request

- **Metode HTTP**: `POST`
- **URL**: `/api/download`
- **Header**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "url": "https://www.tiktok.com/@user/video/1234567890"
  }

## Response
- **Sukses**:
```json
 Status Code: 200 ok
 {
  "status": true,
  "images": ["https://d.tik-cdn.com/image1", "https://d.tik-cdn.com/image2"],
  "videos": ["https://d.tik-cdn.com/dl/video1", "https://d.tik-cdn.com/dl/video2"]
 
 }
- **Kesalahan** :
Status Code: 400 Bad Request
```json
{
  "status": false,
  "message": "URL tidak diberikan"
}

- **Kesalahan Lainnya**
Status Code: 500 Internal Server Error
```json
{
  "status": false,
  "message": "Pesan kesalahan"
}



