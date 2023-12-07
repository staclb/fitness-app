import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string;
const IV_LENGTH = 16;

export const encrypt = (text: string) => {
  console.log('userid in encrypt', text);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv,
  );
  let encrypted = cipher.update(String(text));

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = (text: string) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift() || '', 'hex'); // Extract the IV
  const encryptedText = Buffer.from(textParts.join(':'), 'hex'); // The remaining part is the encrypted data
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv,
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
