import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Input({ type, onChange, name }) {
    return (
        <>
            <label htmlFor={name}><strong>Enter {name}</strong></label>
            <input
                type={type}
                placeholder={`Enter ${name}`}
                name={name}
                onChange={onChange}
                className='form-control'
            />
        </>

    )
}

export default Input