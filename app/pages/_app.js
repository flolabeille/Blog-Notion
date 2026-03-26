// Fichier requis par Next.js pour les styles globaux
// Il enveloppe toutes les pages de l'application
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
