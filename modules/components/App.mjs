import { css } from '../deps.mjs';
import SearchBar from './SearchBar.mjs';
import globalStyles from '../globalStyles.mjs';
import { mapState } from '../stores/index.mjs';

const styles = {
    wrapper: css`
        
    `
}

export default {
    components: { SearchBar },
    template: `<div class="${globalStyles} ${styles.wrapper}">
        <SearchBar />
        {{channelList.isLoading}}
        <span v-if="channelList.isLoading">It's loading</span>
        {{channelList}}
    </div>`,
    computed: mapState('channels', 'channelList'), 
};

