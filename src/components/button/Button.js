import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

import * as styles from './Button.styl';

const Button = ({ children, style='', onClick, to }) => {
    if (to) {
        return <Link styleName={ `button ${ style }` } to={ to }>{ children }</Link>
    } else {
        return <button styleName={ `button ${ style }` } onClick={ onClick } >{ children }</button>
    }
};

export default CSSModules( Button, styles, { allowMultiple: true } );
