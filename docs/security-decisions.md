# Décisions de sécurité

## CVE Next.js 14.x (high)

**Date** : 2026-03-24
**CVE** : GHSA-9g9p-9gw9-jx7f, GHSA-h25m-26qc-wcjf, GHSA-ggv3-7p47-pfv8, GHSA-3x4c-7xq6-9pq8
**Sévérité** : High

**Décision** : Ne pas mettre à jour vers Next.js 16 (breaking change).

**Justification** :

- DoS Image Optimizer : on n'utilise pas next/image avec remotePatterns
- DoS React Server Components : on utilise getServerSideProps, pas RSC
- HTTP request smuggling : pas de règles rewrites configurées
- next/image disk cache : on n'utilise pas next/image

**Risque résiduel** : Faible — les fonctionnalités vulnérables ne sont pas utilisées.
**Révision prévue** : À chaque nouveau sprint ou mise à jour majeure.
