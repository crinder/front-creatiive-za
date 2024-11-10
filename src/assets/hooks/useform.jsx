import { useState } from 'react';

const useform = (initialObj) => {

    const [form, setForm] = useState(initialObj);
    const [inputValue, setInputValue] = useState('')

    const changed = (eventOrDate,name,e) =>{

        if(eventOrDate instanceof Date){
            setForm({
                ...form,
                [name]:eventOrDate
            })
        }else{
            const {name,value, type, selectIndex} = eventOrDate.target;
            const selectvalues = type ==='select-one' ? eventOrDate.target.options[selectIndex].value : value;

            console.log('antes de setform...',form);

            setForm({
                ...form,
                [name]:selectvalues
            })
        }
            
        
    }

    return {
        form,
        changed,
        inputValue,
        

    }
}

export default useform