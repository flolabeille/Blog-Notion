# Contributing Guide

## Prérequis

Avant de contribuer, assure-toi d'avoir installé :

- Git (avec signature GPG configurée)
- Docker Desktop
- Node.js 20+
- Un éditeur de code

## Convention de branches

Toujours créer une branche depuis `main` à jour :

```bash
git checkout main
git pull origin main
git checkout -b <type>/<description>
```

Types de branches autorisés :

| Type       | Usage                   | Exemple                 |
| ---------- | ----------------------- | ----------------------- |
| `feature/` | Nouvelle fonctionnalité | `feature/blog-homepage` |
| `fix/`     | Correction de bug       | `fix/notion-api-error`  |
| `infra/`   | Infrastructure          | `infra/terraform-aws`   |
| `ci/`      | Pipeline CI/CD          | `ci/github-actions`     |
| `docs/`    | Documentation           | `docs/setup-guide`      |
| `test/`    | Tests                   | `test/gpg-signature`    |
| `rep/`     | Structure repo          | `rep/folder-structure`  |

## Convention de commits

Ce projet suit le standard **Conventional Commits** :

```
<type>(<scope>): <description courte>

[corps optionnel]

[footer optionnel]
```

Types autorisés :

| Type       | Usage                                    |
| ---------- | ---------------------------------------- |
| `feat`     | Nouvelle fonctionnalité                  |
| `fix`      | Correction de bug                        |
| `infra`    | Changement d'infrastructure              |
| `ci`       | Modification du pipeline CI/CD           |
| `docs`     | Documentation uniquement                 |
| `refactor` | Refactoring sans nouvelle fonctionnalité |
| `sec`      | Correction de sécurité                   |
| `test`     | Ajout ou modification de tests           |

Exemples :

```bash
git commit -m "feat(blog): ajout page liste des articles"
git commit -m "fix(notion): correction filtre status published"
git commit -m "infra(terraform): provisioning EC2 AWS Paris"
git commit -m "ci(github-actions): ajout scan Trivy"
git commit -m "sec(docker): migration image Distroless"
```

Tous les commits doivent être **signés avec GPG**.

## Processus de Pull Request

### Avant d'ouvrir une PR

- [ ] Ma branche est à jour avec `main`
- [ ] Mes commits suivent la convention Conventional Commits
- [ ] Mes commits sont signés (Verified)
- [ ] J'ai testé mes changements en local
- [ ] Aucun secret ou credential dans le code

### Ouvrir une PR

1. Pousse ta branche : `git push origin <ta-branche>`
2. Ouvre une PR sur GitHub vers `main`
3. Remplis le template de description :

```
## Contexte
Pourquoi cette PR ? Quelle User Story elle adresse ?

## Changements
- Point 1
- Point 2

## Checklist
- [ ] Testé en local
- [ ] Documentation mise à jour si nécessaire
- [ ] Aucun secret dans le code
```

### Après le merge

- Supprime la branche sur GitHub
- Supprime la branche en local : `git branch -D <ta-branche>`
- Met à jour `main` en local : `git pull origin main`

## Definition of Done

Une tâche est terminée quand :

- [ ] Le code fonctionne en local
- [ ] La PR est mergée dans `main`
- [ ] Le pipeline CI/CD est vert
- [ ] La documentation est à jour
- [ ] L'issue GitHub correspondante est fermée

## Règles de sécurité

### Ce qu'on ne commite JAMAIS

- Clés API (Notion, AWS, etc.)
- Mots de passe
- Fichiers `.env` avec de vraies valeurs
- Clés SSH ou GPG privées
- Tokens d'accès

### Ce qu'on utilise à la place

| Secret     | Méthode                                  |
| ---------- | ---------------------------------------- |
| Dev local  | Fichier `.env.local` (dans `.gitignore`) |
| CI/CD      | GitHub Secrets                           |
| Production | Ansible Vault                            |

### Fichiers toujours ignorés

Vérifier que `.gitignore` contient au minimum :

```
.env
.env.local
.env*.local
*.pem
*.key
node_modules/
.next/
```

## Structure du projet

```
mon-repo/
├── .github/
│   └── workflows/        ← Pipelines CI/CD
├── app/                  ← Code source Next.js
├── docs/                 ← Documentation
├── infra/
│   ├── ansible/          ← Configuration serveur
│   └── terraform/        ← Infrastructure as Code
└── CONTRIBUTING.md
```

## Questions ?

Ouvre une issue sur GitHub avec le label `question`.

```

```

# Remerciement

Par avance, je remercie chaque contributeur qui me permettra d'apprendre et d'améliorer le projet tant en terme de disign de l'architecture, que de sécurité et autres.
