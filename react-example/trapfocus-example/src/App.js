import './App.css';
import { focusTrap } from 'magicthecat-trapfocus'
import React, { useEffect, useRef, useState } from 'react';
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={toggleModal}>Open Modal</button>
      {isOpen && (
        <div id="myElement">
          <FocusTrap>
            <div id="modalBackground" onClick={closeModal} />
            <button onClick={closeModal}>Close Modal</button>
            <p>I am a div with id "myElement"</p>
            <button>First Button</button>
            <button>Second Button</button>
            <button>Third Button</button>
            <input />
          </FocusTrap>
        </div>
      )}
    </>
  );
};

function FocusTrap({ children }) {
  const trapRef = useRef(null);

  useEffect(() => {
    if (trapRef.current) {
      const removeFocusTrap = focusTrap(trapRef.current);
      return () => {
        removeFocusTrap();
      };
    }
  }, []);

  return (
    <div ref={trapRef}>
      {children}
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <h1>React Example</h1>

      <Modal />
      <p>hello</p>
    </div>
  );
}

export default App;
