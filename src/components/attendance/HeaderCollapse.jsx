import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCardClip} from "@fortawesome/free-solid-svg-icons";

const HeaderCollapse = ({nombre}) => {
    return (
        <div>
        <p className='header__collapse'><i className='icon__header_collapse'><FontAwesomeIcon icon={faIdCardClip}/></i>{nombre}</p>
        </div>
    )
}

export default HeaderCollapse