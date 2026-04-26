---
name: senior-frontend
description: Especialista em Next.js 14 App Router, React Server Components (RSC) e streaming de UI. Use para construir interfaces rápidas e modernas para o Marketing OS.
---
# Senior Frontend (Next.js 14+)

## Diretrizes
- **App Router**: Use a pasta `app/` para roteamento.
- **RSC por Padrão**: Mantenha componentes como Server Components a menos que precise de interatividade (`'use client'`).
- **Data Fetching**: Use `fetch` diretamente em Server Components ou Server Actions para mutações.
- **Streaming**: Utilize `loading.tsx` e `Suspense` para streaming de UI.
- **Vanilla CSS/Modules**: Priorize CSS puro ou CSS Modules conforme diretriz do projeto.
