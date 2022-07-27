import { css } from '../deps.mjs';
import globalStyles from '../globalStyles.mjs';

const styles = {
    wrapper: css`
        
    `
}

export default {
    inject: ['$stores'],
    template: `<div class="${globalStyles} ${styles.wrapper}">
        {{$stores.channels.channelList}}
    </div>`,
};

