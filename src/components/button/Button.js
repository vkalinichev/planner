import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

import * as styles from './Button.styl';

const Button = ({ children, style='', onClick, to, primary, good, ok, bad }) => {
    let styleName = 'button'

    if ( primary ) styleName += ' primary'
    if ( good ) styleName += ' good'
    if ( ok ) styleName += ' ok'
    if ( bad ) styleName += ' bad'

    if (to) {
        return <Link styleName={ styleName } to={ to }>{ children }</Link>
    } else {
        return <button styleName={ styleName } onClick={ onClick } >{ children }</button>
    }
};

export default CSSModules( Button, styles, { allowMultiple: true } );
