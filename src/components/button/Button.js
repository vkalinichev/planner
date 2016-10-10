import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

import * as styles from './Button.styl';

const Button = ({ children, style='', onClick, to }) => {
    const styleName = 'button ' + style;
    
    if (to) {
        return <Link styleName={ styleName } to={ to }>{ children }</Link>
    } else {
        return <button styleName={ styleName } onClick={ onClick } >{ children }</button>
    }
};

export default CSSModules( Button, styles, { allowMultiple: true } );
