import {Block} from './Block.js';

export function render(query: string, block: Block): Element {
  const root = document.querySelector(query);

  root.appendChild(block.getContent());
  return root;
};