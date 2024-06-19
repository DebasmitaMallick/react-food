import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children, open, className = "", onClose }) => {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

/**
 * Why cleanup function is used instead of just putting an else condition and closing the modal?
 * Explaination: Let's first understand how this is working...
 * Cleanup function is executed before the useEffect runs again or before the component unmounts.
 * Here, when open changes to true, for the first time, useEffect is getting executed for the first time, at that time cleanup function is
 * not getting executed, so the modal just opens...
 * But, when "open" changes from true to false, useEffect is about to run for the second time, before that, the cleanup function gets executed,
 * hence modal get's closed.
 *
 * Now, why this approach instead of using "else"?
 * cause, using cleanup function is more safe, in case of large applications, is modal get's closed unexpectedly, then it may cause some
 * potential bugs
 */
