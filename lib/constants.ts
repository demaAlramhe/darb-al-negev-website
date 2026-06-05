export const PHONE = "0549265633";
export const PHONE_DISPLAY = "054-926-5633";
export const WHATSAPP_NUMBER = "972549265633";
export const EMAIL = "darbnegev@gmail.com";
export const FACEBOOK_URL =
  "https://www.facebook.com/share/1CSq858E4J/";
export const INSTAGRAM_URL =
  "https://www.instagram.com/darbnegev?igsh=OHdmNDViZGxmY2Vq";

export const DEVELOPER_NAME = "Dema Digital Solutions";
export const DEVELOPER_URL = "https://demadigitalsolutions.com/";

export const LOGO_FULL_PATH = "/logoNoBackground.png";
export const LOGO_ICON_PATH = "/looogo.png";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function getWhatsAppInquiryUrl(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
