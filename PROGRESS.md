# PROGRESS.md

Log de avance dia a dia del repositorio. Fuente de verdad del avance; `.ops`
organiza y enlaza, nunca duplica. Formato: una entrada por fecha con alcance,
evidencia y pendientes.

## 2026-11-26

- Alcance: adopcion del kit `ops-lifecycle` (skill + bootstrap `.ops/`).
- Skill actualizada en `.github/skills/ops-lifecycle/` con la seccion
  "Continuidad de contexto" (handoff obligatorio al cerrar sesion) y las
  convenciones adaptadas a este repo (React + Vite + Jest, aliases de barril,
  capas presentation/domain/application/infrastructure, QA en navegador).
- Bootstrap de `.ops/` con READMEs por arbol, `templates/base.md` y
  `project/handoff.md` rellenado con el estado real del repo.
- `.ops/` anadido al `.gitignore`: el arbol se regenera con el bootstrap de la
  skill y el contexto vivo vive en el disco local, no en el historial de git.
- Pendiente: decision del propietario sobre la relacion entre `.ops` y
  `.github/specs/` como sistemas de especificacion.
