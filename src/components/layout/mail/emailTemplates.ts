import mjml2html from 'mjml';

const mail = (host: string, url: string, body: string) => {
  const header = `
    <mj-section background-color="#161919">
      <mj-image alt="Vegan Hacktivists" src="https://veganhacktivists.org/images/VH-logo-web-white.png"></mj-image>
    </mj-section>
  `;
  const footer = `
    <mj-section>
      <mj-text color="#ffffff" font-size="13px" align="center">© 2022 Vegan Hacktivists. All rights reserved.</mj-text>
    </mj-section>
  `;
  return `
    <mjml>
      <mj-head>
        <mj-attributes>
          <mj-text align="left" font-family="-apple-system,BlinkMacSystemFont,Segoe UI, Roboto, Helvetica, Arial" font-size="16px" color="#161919"/>
          <mj-button border-left="10px solid #64BC46" background-color="#292929" href="${url}" border-radius="0px" font-family="Rajdhani, monospace" font-size="18px" color="#ffffff" />
        </mj-attributes>
      </mj-head>
      <mj-body background-color="#161919">
        ${header}
        ${body}
        ${footer}
      </mj-body>
    </mjml>
`;
};

export const verificationMail = (
  host: string,
  url: string,
  textonly = false
) => {
  if (textonly) {
    return `Sign in to ${host}\n${url}\n\n`;
  }
  const body = `
    <mj-section background-color="#ffffff">
      <mj-column>
        <mj-text font-weight="bold">Hey there!</mj-text>
        <mj-text>Someone tried to login to ${host} with your email address.<br>If this was you, you're able to login here:</mj-text>
        <mj-button>Login</mj-button>
        <mj-text>Otherwise you can safely ignore this mail.</mj-texta>
      </mj-column>
    </mj-section>
  `;
  return mjml2html(mail(host, url, body)).html ?? '';
};
