import { Block, PropsType } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from "./Button.tmpl.js";

export class Button extends Block {
  constructor(props: { className: string, child: string }) {
    // Создаём враппер DOM-элемент button
    super("button", props);
  }

  render() {
    // В данном случае render возвращает строкой разметку из шаблонизатора

    const tmpl = handlebars().compile(template);
    return tmpl(this.props);
  }
}