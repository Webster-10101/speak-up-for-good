import { escapeHtml } from './escape-html';

// Turn the AI-written markdown plan into email-safe HTML with inline styles.
// Handles the subset the model actually writes: headings, paragraphs,
// bullet and numbered lists, horizontal rules, bold and italics.

const STYLES = {
  h1: 'color: #667eea; margin: 20px 0 10px 0; font-size: 20px; line-height: 1.3;',
  h2: 'color: #4a5568; margin: 20px 0 8px 0; font-size: 17px; font-weight: 600; line-height: 1.3;',
  h3: 'color: #4a5568; margin: 16px 0 6px 0; font-size: 15px; font-weight: 600; line-height: 1.3;',
  p: 'margin: 0 0 12px 0; font-size: 15px; line-height: 1.6; color: #2d3748;',
  list: 'margin: 0 0 12px 0; padding-left: 22px; font-size: 15px; line-height: 1.6; color: #2d3748;',
  li: 'margin: 0 0 6px 0;',
  hr: 'border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;',
  strong: 'color: #2d3748;',
};

function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, `<strong style="${STYLES.strong}">$1</strong>`)
    .replace(/(^|[^*\w])\*(?!\s)(.+?)\*(?!\w)/g, '$1<em>$2</em>')
    .replace(/(^|[^_\w])_(?!\s)(.+?)_(?!\w)/g, '$1<em>$2</em>');
}

export function planToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let paragraph: string[] = [];
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p style="${STYLES.p}">${paragraph.map(inline).join('<br>')}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      const items = list.items.map(item => `<li style="${STYLES.li}">${inline(item)}</li>`).join('');
      html.push(`<${list.tag} style="${STYLES.list}">${items}</${list.tag}>`);
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushParagraph();
      // A blank line between list items keeps the same list going
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = Math.min(heading[1].length, 3) as 1 | 2 | 3;
      const text = heading[2].replace(/\*\*/g, '');
      html.push(`<h${level + 1} style="${STYLES[`h${level}`]}">${inline(text)}</h${level + 1}>`);
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
      flushParagraph();
      flushList();
      html.push(`<hr style="${STYLES.hr}">`);
      continue;
    }

    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      flushParagraph();
      const tag = bullet ? 'ul' : 'ol';
      if (list && list.tag !== tag) flushList();
      if (!list) list = { tag, items: [] };
      list.items.push((bullet || numbered)![1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return html.join('\n');
}
