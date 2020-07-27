import { app, PureAction, Component } from 'hyperapp';
import html from 'hyperlit';

// import marked from 'marked';
// import dompurify from 'dompurify';
// import oembed from 'oembed-parser';


interface DomEvent<T extends Element> extends Event {
    readonly target: T;
}

interface State {
    readonly todos: string[];
    readonly value: string;
}

const setValue: PureAction<State, DomEvent<HTMLInputElement>> = (state, event) => ({ ...state, value: event.target.value });
const addTodo: PureAction<State, Event> = (state: State, event: Event) => {
    event.preventDefault();
    return { ...state, todos: state.todos.concat(state.value), value: '' };
};

const createTodo: Component<Pick<State, 'value'>> = ({ value }) => html`
    <form>
        <input type="text" oninput=${setValue} value=${value} />
        <button onclick=${addTodo}>Add</button>
    </form>
`;

app<State>({
    init: { todos: [], value: '' },
    view: ({ todos, value }) => html`
        <main>
            <${createTodo} value=${value} />
            <ul>${todos.map((todo: string, id: number) => html`<li key=${id}>${todo}</li>`)}</ul>
        </main>
    `,
    node: document.getElementById('app')!,
});