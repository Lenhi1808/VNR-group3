# Lịch sử Đảng — Website + Chatbot (Vercel)

Dự án này gồm:
- **/index.html**: website Chương 2 (đã thêm nút nổi "Chatbot")
- **/chatbot/index.html**: UI chat tối giản
- **/api/ask.js**: API serverless trên Vercel, làm *proxy* tới RAG API `/ask` của bạn
- **vercel.json**

## Cách triển khai

### Bước A — Deploy API FastAPI (RAG)
1) Dùng bộ `vnr-chatbot-rag.zip` mà mình đã gửi (FastAPI + FAISS).
2) Deploy lên Render/Railway/Fly.io/VM riêng.
3) Lấy URL endpoint `/ask`, ví dụ: `https://your-fastapi-app.onrender.com/ask`.

### Bước B — Deploy website + proxy trên Vercel
1) Đăng nhập https://vercel.com → New Project → Deploy from… → **Upload**.
2) Upload toàn bộ zip này.
3) Sau khi tạo project → **Settings → Environment Variables**:
   - Key: `UPSTREAM_API`
   - Value: URL ở bước A (ví dụ: `https://your-fastapi-app.onrender.com/ask`)
   - Environment: Production
4) **Redeploy**.
5) Truy cập `/chatbot/` để mở UI chat. Nút nổi "💬" cũng mở tab này.

> Nếu muốn bỏ proxy và gọi thẳng API, chỉnh `chatbot/index.html` phần `const API = "/api/ask"` thành URL đầy đủ của FastAPI.

## Tùy biến
- Thay biểu tượng nút chat: đổi `<span>💬</span>` trong `index.html`.
- Đổi vị trí nút chat: CSS selector `#tochat` (bottom/right).
- Bảo mật CORS: cấu hình CORS tại FastAPI cho domain Vercel của bạn.

Chúc bạn triển khai thuận lợi!
