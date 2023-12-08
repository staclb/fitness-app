import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string;
const IV_LENGTH = 16;

export const encrypt = (text: string) => {
  // random value used to help encryption
  const iv = crypto.randomBytes(IV_LENGTH);
  // creates a cipher to encrypt data; with algo, key and random value
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv,
  );
  // encryptes data
  let encrypted = cipher.update(String(text));
  // uses any left over bits from encryption
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  // : is a delimiter => for encrypted dat transmission
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
