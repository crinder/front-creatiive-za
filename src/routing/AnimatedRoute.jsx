import React from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import '../App.css';

export const AnimatedRoute = ({children}) => {
  const location = useLocation()
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={300} classNames="fade">
        <div className="animated-component ">{children}</div>
      </CSSTransition>
    </TransitionGroup>
  )
}
