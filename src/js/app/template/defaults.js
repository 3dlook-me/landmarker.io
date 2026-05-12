'use strict';

import frontal from './frontal';
import side from './side';
import hand from './hand';
import handNew from './hand-new';
import { TEMPLATE_NAMES } from '../consts';

export default [
    {
        template: frontal,
        name: TEMPLATE_NAMES.FRONT_TEMPLATE
    },
    {
        template: side,
        name: TEMPLATE_NAMES.SIDE_TEMPLATE
    },
    {
        template: hand,
        name: TEMPLATE_NAMES.HAND_TEMPLATE
    },
    {
        template: handNew,
        name: TEMPLATE_NAMES.NEW_HAND_TEMPLATE
    },
];
