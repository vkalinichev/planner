import { Link } from 'react-router';

import styles from './Button.styl';

const Button = ({ children, style, onClick, to }) => {
    const className = styles.button + `${ style ? " " + styles[ style ] : "" }`;

    if (to) {
        return <Link className={ className } to={ to }>{ children }</Link>
    } else {
        return <button className={ className } onClick={ onClick } >{ children }</button>
    }
};

export default Button;
