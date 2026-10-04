import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const context = {};
vm.runInNewContext(readFileSync(new URL('../infoswb/core.js', import.meta.url), 'utf8'), context);
const { markdown, parseTopics } = context.InfosCore;
const who = 'https://cdn.who.int/media/docs/default-source/antimicrobial-resistance/surveillance--prevention---control-(spc)/control---response-strategies-(csr)/infections-in-children.pdf?sfvrsn=683ffc7a_1';

test('preserves the full WHO reference with parentheses', () => {
  assert.equal(markdown(`[OMS](${who})`), `<p><a href="${who}" target="_blank" rel="noopener noreferrer">OMS ↗</a></p>`);
});

test('balances nested parentheses and renders multiple references', () => {
  assert.equal(markdown('[A](https://example.org/a(b(c))) e [B](https://example.org/x?one=1&two=2)'), '<p><a href="https://example.org/a(b(c))" target="_blank" rel="noopener noreferrer">A ↗</a> e <a href="https://example.org/x?one=1&amp;two=2" target="_blank" rel="noopener noreferrer">B ↗</a></p>');
});

test('keeps emphasis outside URLs without formatting the URL itself', () => {
  assert.equal(markdown('**Fonte:** [**OMS**](https://example.org/**literal**/`literal`) — `dose`'), '<p><strong>Fonte:</strong> <a href="https://example.org/**literal**/`literal`" target="_blank" rel="noopener noreferrer"><strong>OMS</strong> ↗</a> — <code>dose</code></p>');
});

test('leaves malformed and non-HTTP references as escaped text', () => {
  const result = markdown('[ruim](https://example.org/a(b) [JS](javascript:alert(1)) <img src=x onerror=alert(1)>');
  assert.ok(!result.includes('<a '));
  assert.ok(!result.includes('<img'));
  assert.ok(result.includes('&lt;img'));
});

test('escapes attribute quotes and labels', () => {
  const result = markdown('[<script>](https://example.org/"onmouseover="bad)');
  assert.equal(result, '<p><a href="https://example.org/&quot;onmouseover=&quot;bad" target="_blank" rel="noopener noreferrer">&lt;script&gt; ↗</a></p>');
});

test('keeps table and topic identity behavior', () => {
  const table = markdown('| Fonte | URL |\n| --- | --- |\n| OMS | [OMS](' + who + ') |');
  assert.ok(table.includes('<th scope="col">Fonte</th>'));
  assert.ok(table.includes(`href="${who}"`));
  const topics = parseTopics('## 70. Cólera em Pediatria\n\nDocumento.');
  assert.equal(topics[0].id, 'clinica-1c8ab9f6');
  assert.equal(topics[0].number, 70);
});
