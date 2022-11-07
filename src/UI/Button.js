import classes from './Button.module.css';

const Button = props => {
    return (
        <button
            type={props.type || 'button'}
            onClick={props.onClick}
            style={props.style}
            className={`${classes['button']} ${props.className}`}
            todoid={props.todoid || ''}
            category={props.category || ''}
            disabled={props.disabled || false}
        >
            {props.children}
        </button>
    );
};

export default Button;
