import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

const Toasts = ({name,id,clientResponse,setClientResponse}) => {

    const [showA, setShowA] = useState(true);
    const toggleShowA = (id) => {
    let filterClient;
      
      filterClient = clientResponse.filter(select => select.id != id);
      setClientResponse(filterClient);
      setShowA(!showA);
      
    }
    
  return (
    <Row>
      <Col md={2} className="mb-2">
        <Toast show={showA} onClose={ e => toggleShowA(id)} >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{name}</strong>
          </Toast.Header>
          {/*<Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>*/}
        </Toast>
      </Col>
    </Row>
  )
}

export default Toasts