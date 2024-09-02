import React, { useState } from 'react'

const useform = (initialObj) => {

    const [form, setForm] = useState(initialObj);

    const changed = (eventOrDate,name) =>{

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
        changed
    }
}

export default useform