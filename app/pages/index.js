// Page d'accueil
import { getPublishedPosts } from "../lib/notion";
import Link from "next/link";

// getServerSideProps s'exécute côté serveur à chaque requête
// Les secrets Notion ne sont jamais exposés au navigateur
export async function getServerSideProps() {
  const posts = await getPublishedPosts();
  return { props: { posts } };
}

// Couleurs sémantiques pour les tags
const TAG_COLORS = {
  terraform: { bg: "#EDE9FE", text: "#5B21B6", border: "#C4B5FD" },
  aws: { bg: "#FFF7ED", text: "#9A3412", border: "#FED7AA" },
  docker: { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  kubernetes: { bg: "#EFF6FF", text: "#1E40AF", border: "#93C5FD" },
  git: { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  github: { bg: "#F9FAFB", text: "#111827", border: "#D1D5DB" },
  ansible: { bg: "#FFF1F2", text: "#9F1239", border: "#FECDD3" },
  devsecops: { bg: "#FDF2F8", text: "#9D174D", border: "#FBCFE8" },
  agile: { bg: "#FDF2F8", text: "#9D174D", border: "#FBCFE8" },
  devops: { bg: "#F5F3FF", text: "#5B21B6", border: "#DDD6FE" },
  "next.js": { bg: "#F9FAFB", text: "#111827", border: "#D1D5DB" },
  react: { bg: "#EFF6FF", text: "#0369A1", border: "#BAE6FD" },
  python: { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
};

const FALLBACK_COLORS = [
  { bg: "#EEF2FF", text: "#4338CA", border: "#C7D2FE" },
  { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
  { bg: "#FFF7ED", text: "#9A3412", border: "#FED7AA" },
  { bg: "#F5F3FF", text: "#5B21B6", border: "#DDD6FE" },
];

function getTagColor(tag) {
  const key = tag.toLowerCase().trim();
  if (TAG_COLORS[key]) return TAG_COLORS[key];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

export default function Home({ posts }) {
  return (
    <>
      <header className="header">
        <h1>Blog de Florian Bourdon</h1>
        <p>Articles importés depuis Notion</p>
        <span className="header-badge">⚡ DevSecOps · Agile · Cloud</span>
      </header>

      <div className="container">
        <p className="section-title">
          {posts.length} article{posts.length > 1 ? "s" : ""} publié
          {posts.length > 1 ? "s" : ""}
        </p>
        <div className="grid">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="card">
              <span className="card-arrow">→</span>
              <div className="card-title">{post.title}</div>
              {post.date && (
                <div className="card-date">
                  📅{" "}
                  {new Date(post.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
              {post.tags.length > 0 && (
                <div className="tags">
                  {post.tags.map((tag) => {
                    const color = getTagColor(tag);
                    return (
                      <span
                        key={tag}
                        className="tag"
                        style={{
                          background: color.bg,
                          color: color.text,
                          borderColor: color.border,
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      <footer className="footer">
        Fait avec <span>♥</span> · Propulsé par Notion + Next.js
      </footer>
    </>
  );
}
