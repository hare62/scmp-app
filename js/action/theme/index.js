import Types from '../types';
/**
 * 
 * @param {*} theme 
 */

export function onThemeChange(theme) {
    return {type: Types.THEME_CHANGE, theme: theme};

}