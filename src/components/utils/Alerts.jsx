import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Alerts = ({variant,message}) => {
  return (
    <Alert variant={variant}>{message}</Alert>
  )
}



export default Alerts