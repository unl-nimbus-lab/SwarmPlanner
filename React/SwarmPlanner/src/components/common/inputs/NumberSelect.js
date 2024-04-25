import react, {useState} from 'react'

const NumberSelect = ( {onChange} ) => {
    const [inputValue, setInputValue] = useState(1);

    const handleInputChange = (event) => {
        const value = event.target.value.replace(/\D/,'');
        setInputValue(value);
        onChange(value);
    }

    return(
        <input 
            type="number"
            id="input"
            value={inputValue} 
            onChange={handleInputChange}
            min="1"
        />
    );
};

export default NumberSelect;