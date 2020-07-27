import { VNode, Component } from './hyperapp';

export default function html<T = object>(literals: TemplateStringsArray, ...placeholders: Array<any>): VNode<T>;
