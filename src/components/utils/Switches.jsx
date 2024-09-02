import React from 'react'
import Form from 'react-bootstrap/Form';

const Switches = ({name,id_toggle,changed,checked}) => {
  return (
    <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id={id_toggle}
        label={name}
        onChange={changed}
      />
    </Form>
  );
}
export default Switches