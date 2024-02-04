import react, {useState} from 'react'

const NumberSelect = ( {onChange} ) => {
    const [inputValue, setInputValue] = useState(0);

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
            min="0"
        />
    );
};

export default NumberSelect;