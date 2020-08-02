import { app, Action, Component } from 'hyperapp';
import styled from 'hyperapp-styled-components';
import html from 'hyperlit';
import marked, { MarkedOptions } from 'marked';
// import { extract } from 'oembed-parser';
import createDOMPurify from 'dompurify';

const DOMPurify = createDOMPurify(window);

interface DomEvent<T extends Element> extends Event {
    readonly target: T;
}

interface State {
    readonly source: string;
    readonly preview: string;
}

const setSource: Action<State, DomEvent<HTMLElement>> = (state, { target: { innerText: markdown }}) => [
    { ...state, markdown },
    [(dispatch, options: MarkedOptions) => marked(
        markdown,
        options,
        (_error, html) => dispatch((state: State) => ({ ...state, preview: DOMPurify.sanitize(html) })),
    ), {} as MarkedOptions],
];

const Wrapper = styled.div`
  min-height: 500px;
  border: 1px solid #aaa;
  white-space: pre;
`;

const Editor: Component = (_, children) => html`
    <${Wrapper} oninput=${setSource} role="textbox" contenteditable="true" autocorrect="on" spellcheck="true" translate="no">
        ${children}
    <//>
`;

app<State>({
    init: {
        source: `
# title 1

Lorem ipsum

## title 2`,
        preview: '',
    },
    view: ({ source, preview }) => html`
        <main>
            <${Editor}>${source}<//>
            <article innerHTML=${preview}></article>
        </main>
    `,
    node: document.getElementById('app')!,
});
