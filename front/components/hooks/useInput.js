import { useState,useCallback } from "react";

export default (initial=null) => {
    const [value,setValue] = useState(initial);

    const onChange = useCallback((e)=>{
        setValue(e.target.value);
    },[])

    return [value,onChange,setValue];
}