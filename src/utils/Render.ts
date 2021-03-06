import {Block} from './Block';

export function render(query: string, block: Block): Element {
  const root = document.querySelector(query);

  root.appendChild(block.getContent());
  block.componentRendered();
  return root;
}