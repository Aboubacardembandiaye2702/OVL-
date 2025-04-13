uconst dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PREFIXE: process.env.PREFIXE || "#",
  NOM_OWNER: process.env.NOM_OWNER || "lugh",
  NUMERO_OWNER: process.env.NUMERO_OWNER || "221772430620",
  MODE: process.env.MODE || "public",
  MENU: process.env.MENU || "https://i.ibb.co/ynx9QcZ/image.jpg",
  SESSION_ID: process.env.SESSION_ID || "Ovl-MD_aUCZct6w_SESSION-ID",
  LEVEL_UP: process.env.LEVEL_UP || "non",
  STICKER_PACK_NAME: process.env.STICKER_PACK_NAME || "°•○haibodong○•°",
  STICKER_AUTHOR_NAME: process.env.STICKER_AUTHOR_NAME || "°•○F@T@L!T!○•°",
  DATABASE: process.env.DATABASE,
  RENDER_API_KEY: process.env.RENDER_API_KEY,
};
