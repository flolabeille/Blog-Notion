/** @type {import('next').NextConfig} */
const nextConfig = {
  // On désactive la télémétrie Next.js — bonne pratique privacy
  // Next.js collecte des données anonymes par défaut
  experimental: {
    // Permet d'utiliser les variables d'environnement côté serveur
    serverComponentsExternalPackages: ["@notionhq/client"],
  },
};

module.exports = nextConfig;
