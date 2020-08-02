import { VNode, Component, JSXAttribute } from './hyperapp';

interface styledFactory {
    (literals: TemplateStringsArray, ...placeholders: Array<any>): VNode<JSXAttribute>;
}

const styled: Record<string, styledFactory>;

export default styled;
