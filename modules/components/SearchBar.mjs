import { css } from '../deps.mjs';
import { mapState } from '../stores/index.mjs';

const styles = {
    form: css`
        
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

