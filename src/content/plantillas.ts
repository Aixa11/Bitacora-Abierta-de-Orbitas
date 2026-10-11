/** Plantillas vacías para descargar. No incluyen soluciones de desafíos. */

export type PlantillaDescarga = {
  id: string;
  titulo: string;
  descripcion: string;
  filename: string;
  markdown: string;
};

export const PLANTILLAS: PlantillaDescarga[] = [
  {
    id: 'notas-metodo',
    titulo: 'Notas del método (7 pasos)',
    descripcion: 'Campos vacíos para responder el método general sin cerrar la idea.',
    filename: 'notas-metodo-space-apps.md',
    markdown: `# Notas del método — Space Apps 2026

Desafío:
Equipo:
Fecha:

## 1. Entender
-

## 2. Usuario
-

## 3. Pregunta GEOINT
-

## 4. Datos (con fuente)
-

## 5. Alcance mínimo (48 h)
-

## 6. Historia (30 s)
-

## 7. Entrega (licencia, citas, demo)
-

> Esta plantilla no resuelve el desafío. Las ideas son de tu equipo.
`,
  },
  {
    id: 'pitch',
    titulo: 'Guion de pitch (3 min)',
    descripcion: 'Estructura problema → usuario → datos → demo → impacto.',
    filename: 'pitch-3min-space-apps.md',
    markdown: `# Pitch 3 minutos — Space Apps 2026

## Problema (30 s)
-

## Usuario (30 s)
-

## Datos NASA / socios (45 s)
- Fuente 1:
- Fuente 2:

## Demo (45 s)
- Qué mostramos:
- Qué NO mostramos:

## Impacto y siguiente paso (30 s)
-

## Cierre
Licencia: · Uso de IA declarado: sí/no
`,
  },
  {
    id: 'referencias',
    titulo: 'Tabla de referencias',
    descripcion: 'Esqueleto para pegar en la entrega (completa con Mi kit).',
    filename: 'referencias-space-apps.md',
    markdown: `# Recursos utilizados

| Nombre | Organización | URL | Fecha de acceso | Misión/producto/versión |
| --- | --- | --- | --- | --- |
|  |  |  |  | TODO |

Notas legales:
- Semáforo / términos revisados:
- Licencia del proyecto:
`,
  },
];

export function downloadMarkdown(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
