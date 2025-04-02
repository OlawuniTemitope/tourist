export function welcomeEmail(name, url) {
  return `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <table width="100%" border="0" cellspacing="0" 
          cellpadding="0" style="background-color: #f8f8f8; padding: 10px;">
            <tr>
              <td>
                <h1 style="color: #333;">Hello, ${name}!</h1>
                <p style="font-size: 16px;">Welcome to Natours, we're glad to have you 🎉🙏</p>
                <p style="font-size: 16px;">We're all a big familiy here, so make <br/> sure to upload your user photo so we get to know you a bit better!</p>
                <br />
                <p> <a href=${url} target="_blank">Login</a> <br/> Upload user photo</p>
                <p>If you need any help with booking your next tour, please don't hesitate to contact me!</p>
                <p>Best regards,<br />The Team</p>
                <span>
            Natours Inc, 123 Nowhere Road, San Francisco CA 99999
                        <br/>
                        |  Don't like these emails? 
                    <a href="https://example.com">Unsubscribe</a> 
             </span>
          
              </td>
            </tr>
            </table>
        </body>
      </html>
    `;
}
export function passwordResetEmail(name, url) {
  return `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <table width="100%" border="0" cellspacing="0" 
          cellpadding="0" style="background-color: #f8f8f8; padding: 10px;">
            <tr>
              <td>
                <h1 style="color: #333;">Hello, ${name}!</h1>
                <p style="font-size: 16px;">Forgot your password? <br/>
                 Submit a PATCH request with your new password and passwordConfirm to:  ${url}.</p>
                <p style="font-size: 16px;">We're all a big familiy here, so make <br/> 
                sure to upload your user photo so we get to know you a bit better!</p>
                <br />
                <p> <a href=${url} target="_blank">Login</a> <br/> Upload user photo</p>
                <p> <br/> If you didn't forget your password, please ignore this email!</p>
                <p>Best regards,<br />The Team</p>
                <span>
            Natours Inc, 123 Nowhere Road, San Francisco CA 99999 
             </span>
          
              </td>
            </tr>
            </table>
        </body>
      </html>
    `;
}
