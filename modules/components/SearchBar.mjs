import { css } from '../deps.mjs';
import { mapState } from '../stores/index.mjs';

const styles = {
    form: css`
        border: 0.1rem solid #d1d1d1;
        cursor: text;
    `,
    pill: css`
        display: inline-block;
        color: white;
        font-size: 0.75em;
        background: rgb(185,19,141);
        border-radius: 1em;
        padding: 2px 10px;
        margin: 2px;
    `,
    input: css`
        width: auto !important;
        border: none !important;
    `
}

export default {
    components: {},
    data: () => ({ input: '', queries: new Set(), }),
    template: `<div>
        <form class="${styles.form}" @submit="searchChannel" @click="$refs.input.focus()">
            <span v-for="query in queries" class="${styles.pill}">{{query}}</span>
            <input v-model="input" @keydown.delete="handleBackspace" ref="input" class="${styles.input}" />
        </form>
        <div>
            <div v-for="result in channelSearch.data" @click="addToQueries(result)">
                {{result.name}}
            </div>
        </div>
        <button>Fetch channel data</button>
    </div>`,
    computed: mapState('channels', ['channelList', 'channelSearch']),
    watch: {
        input(newInput, oldInput) {
            if (newInput === '' && this.channelSearch.isFetched) {
                this.channelSearch.reset();
                return;
            }
            if (Math.abs(newInput.length - oldInput.length) <= 1) return;
            const validCandidates = newInput.replace(/[^a-zA-Z0-9_-]/g, ' ').split(' ');
            validCandidates.forEach(candidate => {
                if (candidate.match(/[a-zA-Z0-9_-]{11}/) === null) return;
                this.queries.add(candidate);
            });
            this.input = '';
        }
    },
    methods: {
        async searchChannel(event) {
            event.preventDefault();
            if (this.input.length === 0) return
            this.channelSearch.fetch(this.input);
        },
        addToQueries(channel) {
            this.queries.add(channel.id);
            this.$refs.input.focus();
        },
        handleBackspace() {
            if (this.input.length > 0 || this.queries.size === 0) return;
            const lastQuery = Array.from(this.queries).at(-1);
            this.queries.delete(lastQuery);
        },
        queryChannel(event) {
            event.preventDefault();
            this.channelList.fetch(this.input);
        }
    }
};

