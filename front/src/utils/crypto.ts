export const decryptMessage = async (encryptedData: string): Promise<string> => {
  if (!encryptedData || !encryptedData.includes(':')) return encryptedData;

  const [ivBase64, authTagBase64, cipherBase64] = encryptedData.split(':');

  if (!ivBase64 || !authTagBase64 || !cipherBase64) return encryptedData;

  // Función para decodificar base64 a Uint8Array
  const base64ToArrayBuffer = (b64: string) => {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };

  try {
    const iv = base64ToArrayBuffer(ivBase64);
    const authTag = base64ToArrayBuffer(authTagBase64);
    const cipherText = base64ToArrayBuffer(cipherBase64);
    const keyString = import.meta.env.VITE_ENCRYPTION_KEY;

    // Juntamos el ciphertext y el authtag (WebCrypto los espera combinados para GCM)
    const dataToDecrypt = new Uint8Array(cipherText.length + authTag.length);
    dataToDecrypt.set(cipherText);
    dataToDecrypt.set(authTag, cipherText.length);

    // Importamos la clave simétrica
    const key = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(keyString),
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );

    // Desciframos
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      dataToDecrypt
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error('Error al descifrar el mensaje:', error);
    return '🔒 [Mensaje cifrado]';
  }
};
