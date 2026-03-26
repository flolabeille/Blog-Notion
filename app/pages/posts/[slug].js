// Page d'article
import { getPostBySlug } from "../../lib/notion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

export async function getServerSideProps({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}

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
};

const FALLBACK_COLORS = [
  { bg: "#EEF2FF", text: "#4338CA", border: "#C7D2FE" },
  { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
  { bg: "#FFF7ED", text: "#9A3412", border: "#FED7AA" },
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

// Bouton copier pour les blocs de code
function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      style={{
        position: "absolute",
        top: "0.75rem",
        right: "0.75rem",
        background: copied ? "#22C55E" : "rgba(255,255,255,0.1)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "6px",
        padding: "0.25rem 0.6rem",
        fontSize: "0.75rem",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
    >
      {copied ? "✓ Copié" : "Copier"}
    </button>
  );
}

// Composants personnalisés pour le rendu Markdown
const components = {
  code({ node, inline, className, children, ...props }) {
    const content = String(children).replace(/\n$/, "");

    // Code inline → surbrillance violette sans bouton copier
    if (inline) {
      return (
        <code
          style={{
            background: "#F1F5F9",
            color: "#6366F1",
            padding: "0.15rem 0.4rem",
            borderRadius: "4px",
            fontSize: "0.875em",
            fontFamily: "'SF Mono', Monaco, monospace",
          }}
          {...props}
        >
          {children}
        </code>
      );
    }

    // Bloc de code → fond sombre avec bouton copier
    return (
      <div style={{ position: "relative", margin: "1rem 0" }}>
        <pre
          style={{
            background: "#0F172A",
            color: "#E2E8F0",
            padding: "1.25rem 3rem 1.25rem 1.25rem",
            borderRadius: "12px",
            overflowX: "auto",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
        >
          <code
            style={{ fontFamily: "'SF Mono', Monaco, monospace" }}
            {...props}
          >
            {children}
          </code>
        </pre>
        <CopyButton code={content} />
      </div>
    );
  },
};

export default function PostPage({ post }) {
  if (!post) return null;

  return (
    <>
      <header className="header-article">
        <Link href="/" className="back">
          ← Retour aux articles
        </Link>
      </header>

      <div className="container-article">
        <div className="article-header">
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            {post.date && (
              <span className="article-date">
                📅{" "}
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
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
          </div>
        </div>

        <article className="article-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>

      <footer className="footer">
        Fait avec <span>♥</span> · Propulsé par Notion + Next.js
      </footer>
    </>
  );
}
