import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// Initialisation du client Notion avec la clé API
// La clé est stockée dans les variables d'environnement — jamais en dur dans le code
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Convertisseur de blocs Notion vers Markdown
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Récupère tous les articles avec le statut "Published" depuis Notion
 * Filtre les brouillons — seuls les articles publiés sont affichés
 */
export async function getPublishedPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    // Filtre : uniquement les articles avec Status = "Published"
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
  });

  // Transformation de la réponse Notion en objet simple
  return response.results.map((page) => ({
    id: page.id,
    title: page.properties.Name?.title[0]?.plain_text || "Sans titre",
    slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
    date: page.properties.Date?.date?.start || null,
    tags: page.properties.Tags?.multi_select?.map((t) => t.name) || [],
  }));
}

/**
 * Récupère un article complet par son slug
 * Le slug est l'identifiant URL de l'article (ex: "mon-premier-article")
 */
export async function getPostBySlug(slug) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  // Si aucun article trouvé, on retourne null
  if (!response.results.length) return null;

  const page = response.results[0];

  // Conversion du contenu Notion en Markdown
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const content = n2m.toMarkdownString(mdBlocks);

  return {
    id: page.id,
    title: page.properties.Name?.title[0]?.plain_text || "Sans titre",
    slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
    date: page.properties.Date?.date?.start || null,
    tags: page.properties.Tags?.multi_select?.map((t) => t.name) || [],
    content: content.parent,
  };
}
