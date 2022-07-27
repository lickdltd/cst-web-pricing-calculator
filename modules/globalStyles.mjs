import { css } from './deps.mjs';

// Because this is a plugin, "global" styles still need to be scoped
export default css`
& .sr-only {
    position:absolute;
    left:-10000px;
    top:auto;
    width:1px;
    height:1px;
    overflow:hidden;
}`