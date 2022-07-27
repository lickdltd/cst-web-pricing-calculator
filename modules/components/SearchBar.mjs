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
    data: () => ({ input: '' }),
    template: `<form class="${styles.form}" @submit="queryChannel">
        <input v-model="input" />
    </form>`,
    computed: mapState('channels', 'channelList'),
    methods: {
        queryChannel(event) {
            event.preventDefault();
            console.log(this.channelList);
            this.channelList.fetch(this.input);
        }
    }
};

