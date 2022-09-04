import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

//https://stackoverflow.com/questions/49426474/can-a-react-portal-be-used-in-a-stateless-functional-component-sfc
const UserActionPopup = ({children, className = 'popup_portal', el = 'div'}) => {
    const [container] = useState(() => {
        //this will be executed on the initial render
        return document.createElement(el);
    });

    useEffect(() => {
        container.classList.add(className);
        document.body.appendChild(container);

        return () => {
            document.body.removeChild(container);
        }

    },[])

    return createPortal(children, container);
}

export default UserActionPopup;