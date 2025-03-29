const { ovlcmd } = require("../framework/ovlcmd");
const { WA_CONF } = require('../DataBase/Wa_conf');

ovlcmd(
    {
        nom_cmd: "save",
        classe: "Status",
        react: "💾",
        desc: "Télécharge un statut WhatsApp",
    },
    async (ms_org, ovl, _cmd_options) => {
        const { ms, msg_Repondu, repondre } = _cmd_options;
        
        if (ms_org !== "status@broadcast") {
            return repondre("Cette commande ne fonctionne que sur les statuts WhatsApp.");
        }

        try {
            let media, options = { quoted: ms };
            
            if (ms.message.extendedTextMessage) {
                await ovl.sendMessage(ovl.user.id, { text: ms.message.extendedTextMessage.text }, options);
            } else if (ms.message.imageMessage) {
                media = await ovl.dl_save_media_ms(ms.message.imageMessage);
                await ovl.sendMessage(ovl.user.id, { image: { url: media }, caption: ms.message.imageMessage.caption }, options);
            } else if (ms.message.videoMessage) {
                media = await ovl.dl_save_media_ms(ms.message.videoMessage);
                await ovl.sendMessage(ovl.user.id, { video: { url: media }, caption: ms.message.videoMessage.caption }, options);
            } else if (ms.message.audioMessage) {
                media = await ovl.dl_save_media_ms(ms.message.audioMessage);
                await ovl.sendMessage(id_Bot, { audio: { url: media }, mimetype: "audio/mp4", ptt: false }, options);
            } else {
                return repondre("Ce type de statut n'est pas pris en charge.");
            }
        } catch (_error) {
            console.error("Erreur lors du téléchargement du statut :", _error.message || _error);
        }
    }
);

ovlcmd(
  {
    nom_cmd: "presence",
    classe: "Private",
    react: "👤",
    desc: "Active ou configure la présence sur WhatsApp",
  },
  async (jid, ovl, cmd_options) => {
    const { ms, repondre, arg, prenium_id } = cmd_options;
    try {
      if (!prenium_id) {
        return repondre("Seuls les utilisateurs prenium peuvent utiliser cette commande");
      }

      const sousCommande = arg[0]?.toLowerCase();
      const validtypes = ['off', 'enligne', 'enregistre', 'ecrit'];
      const types = {
        '1': 'enligne',
        '2': 'enregistre',
        '3': 'ecrit'
      };

      const [settings] = await CONF.findOrCreate({
        where: { id: jid },
        defaults: { id: jid, presence: 'non' },
      });

      if (sousCommande === 'off') {
        settings.presence = 'non';
        await settings.save();
        return repondre("La présence est maintenant désactivée.");
      }

      if (types[sousCommande]) {
        if (settings.presence === types[sousCommande]) {
          return repondre(`La présence est déjà configurée sur ${types[sousCommande]}`);
        }

        settings.presence = types[sousCommande];
        await settings.save();
        return repondre(`La présence est maintenant définie sur ${types[sousCommande]}`);
      }

      return repondre("Utilisation :\n" +
        "presence 1: Configurer la présence sur 'enligne'\n" +
        "presence 2: Configurer la présence sur 'enregistre'\n" +
        "presence 3: Configurer la présence sur 'ecrit'\n" +
        "presence off: Désactiver la présence");
    } catch (error) {
      console.error("Erreur lors de la configuration de presence :", error);
      repondre("Une erreur s'est produite lors de l'exécution de la commande.");
    }
  }
);

ovlcmd(
  {
    nom_cmd: "lecture_status",
    classe: "Status",
    react: "📖",
    desc: "Active ou désactive la lecture auto des status",
  },
  async (jid, ovl, cmd_options) => {
    const { ms, repondre, arg, prenium_id } = cmd_options;
    try {
      if (!prenium_id) {
        return repondre("Seuls les utilisateurs prenium peuvent utiliser cette commande");
      }

      const sousCommande = arg[0]?.toLowerCase();
      const [settings] = await CONF.findOrCreate({
        where: { id: jid },
        defaults: { id: jid, lecture_status: 'non' },
      });

      if (sousCommande === 'off') {
        settings.lecture_status = 'non';
        await settings.save();
        return repondre("La lecture du statut est maintenant désactivée.");
      }

      if (sousCommande === 'on') {
        settings.lecture_status = 'oui';
        await settings.save();
        return repondre("La lecture du statut est maintenant activée.");
      }

      return repondre("Utilisation :\n" +
        "lecture_status on: Activer la lecture du statut\n" +
        "lecture_status off: Désactiver la lecture du statut");
    } catch (error) {
      console.error("Erreur lors de la configuration de lecture_status :", error);
      repondre("Une erreur s'est produite lors de l'exécution de la commande.");
    }
  }
);

ovlcmd(
  {
    nom_cmd: "dl_status",
    classe: "Status",
    react: "📥",
    desc: "Active ou désactive le téléchargement auto des status",
  },
  async (jid, ovl, cmd_options) => {
    const { ms, repondre, arg, prenium_id } = cmd_options;
    try {
      if (!prenium_id) {
        return repondre("Seuls les utilisateurs prenium peuvent utiliser cette commande");
      }

      const sousCommande = arg[0]?.toLowerCase();
      const [settings] = await CONF.findOrCreate({
        where: { id: jid },
        defaults: { id: jid, dl_status: 'non' },
      });

      if (sousCommande === 'off') {
        settings.dl_status = 'non';
        await settings.save();
        return repondre("Le téléchargement du statut est maintenant désactivé.");
      }

      if (sousCommande === 'on') {
        settings.dl_status = 'oui';
        await settings.save();
        return repondre("Le téléchargement du statut est maintenant activé.");
      }

      return repondre("Utilisation :\n" +
        "dl_status on: Activer le téléchargement du statut\n" +
        "dl_status off: Désactiver le téléchargement du statut");
    } catch (error) {
      console.error("Erreur lors de la configuration de dl_status :", error);
      repondre("Une erreur s'est produite lors de l'exécution de la commande.");
    }
  }
);

ovlcmd(
  {
    nom_cmd: "likestatus",
    classe: "Status",
    react: "👍",
    desc: "Active ou désactive les likes auto sur les statuts",
  },
  async (jid, ovl, cmd_options) => {
    const { ms, repondre, arg, prenium_id } = cmd_options;
    try {
      if (!prenium_id) {
        return repondre("Seuls les utilisateurs prenium peuvent utiliser cette commande");
      }

      const sousCommande = arg[0]?.toLowerCase();
      const [settings] = await CONF.findOrCreate({
        where: { id: jid },
        defaults: { id: jid, like_status: 'non' },
      });

      if (sousCommande === 'off') {
        settings.like_status = 'non';
        await settings.save();
        return repondre("Les likes sur les statuts sont maintenant désactivés.");
      }

      if (sousCommande === 'on') {
        settings.like_status = 'oui';
        await settings.save();
        return repondre("Les likes sur les statuts sont maintenant activés.");
      }

      return repondre("Utilisation :\n" +
        "like_status on: Activer les likes sur les statuts\n" +
        "like_status off: Désactiver les likes sur les statuts");
    } catch (error) {
      console.error("Erreur lors de la configuration de like_status :", error);
      repondre("Une erreur s'est produite lors de l'exécution de la commande.");
    }
  }
);
