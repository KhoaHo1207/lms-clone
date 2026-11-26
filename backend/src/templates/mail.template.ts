export const authTemplate = (fullName: string, otp: string) => {
  return `
    <!DOCTYPE html>
    <html lang="vi">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify your email - LMS CLONE</title>
      </head>

      <body style="
        margin: 0;
        padding: 40px 16px;
        background-color: #f4f7f6;
        font-family: Arial, Helvetica, sans-serif;
        color: #333333;
      ">
        <div style="
          max-width: 520px;
          margin: 0 auto;
          padding: 40px 32px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        ">
          <h1 style="
            margin: 0 0 8px;
            color: #16a34a;
            font-size: 28px;
            text-align: center;
          ">
            LMS CLONE
          </h1>

          <h2 style="
            margin: 24px 0 16px;
            font-size: 22px;
            color: #222222;
          ">
            Welcome, ${fullName}!
          </h2>

          <p style="
            font-size: 15px;
            line-height: 1.6;
            color: #555555;
          ">
            Thank you for signing up for LMS CLONE.
            Please verify your email address to activate your account.
          </p>

          <p style="
            margin: 28px 0 12px;
            text-align: center;
            font-size: 14px;
            color: #555555;
          ">
            Your verification code:
          </p>

          <div style="
            margin: 0 auto 28px;
            padding: 18px;
            background-color: #f0fdf4;
            border: 1px dashed #16a34a;
            border-radius: 8px;
            text-align: center;
          ">
            <span style="
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #16a34a;
            ">
              ${otp}
            </span>
          </div>

          <p style="
            font-size: 13px;
            line-height: 1.6;
            color: #888888;
          ">
            If you didn't create an account on LMS CLONE,
            you can safely ignore this email.
          </p>

          <hr style="
            margin: 28px 0 16px;
            border: none;
            border-top: 1px solid #eeeeee;
          " />

          <p style="
            margin: 0;
            font-size: 12px;
            color: #aaaaaa;
            text-align: center;
          ">
            &copy; ${new Date().getFullYear()} LMS CLONE. All rights reserved.
          </p>
        </div>
      </body>
    </html>
  `;
};
