Arcjet là một SDK gắn trong chính server Express. Mỗi request gọi protect() trước khi vào controller. Arcjet trả về cho phép, từ chối, hoặc lỗi. App của bạn quyết định trả 403 hay 429. Nó không thay login, OTP, cookie hay Zod.

Có bốn lớp thường dùng với API auth như backend này.

Shield xem path, query và header để chặn mẫu tấn công phổ biến như SQL injection, XSS, path traversal. Nó không đọc body JSON, nên mật khẩu và OTP vẫn do Zod cùng controller xử lý.

Phát hiện bot nhận diện client tự động. Form đăng ký và đăng nhập là do người dùng gửi, nên bot tạo tài khoản hàng loạt bị chặn. Test hay monitor thì khai báo cho phép riêng.

Giới hạn tần suất đếm theo IP trong một khoảng thời gian. Vượt ngưỡng thì 429. Đây là lớp chặn dò mật khẩu ở /login, dò 6 số OTP ở /verify-email, và gửi mail liên tục ở /register cùng /resend-otp.

Bảo vệ đăng ký gom bot, giới hạn tần suất và kiểm tra email: cú pháp, domain có nhận mail không, email dùng một lần. Hợp với /register vì mail xác minh đang gửi qua Brevo. Email rác sẽ không vào được hàng đợi gửi mail.

/me và /logout đã có cookie. Arcjet ở đó chỉ cần Shield nhẹ. Không cần kiểm tra email lại.

Nên bật rule mới ở chế độ DRY_RUN trước: Arcjet vẫn ghi quyết định nhưng luôn cho qua, để xem có chặn nhầm người thật không. Rồi chuyển từng rule sang LIVE. Nếu dịch vụ Arcjet lỗi, mặc định là cho request đi tiếp và chỉ ghi log, để API không chết theo. Route nhạy như login có thể chọn chặn khi Arcjet lỗi.

Cần một ARCJET_KEY trong .env. Package @arcjet/node chỉ chạy ESM, backend này đã là ESM. Nó yêu cầu Node 22.21 trở lên hoặc 24.5 trở lên.
