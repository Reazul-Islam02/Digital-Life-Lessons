import React from 'react';
import { IoClose } from 'react-icons/io5';

const Modal = ({ id, title, children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box relative border border-base-300 shadow-2xl rounded-2xl">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    <IoClose size={24} />
                </button>
                {title && <h3 className="font-bold text-2xl mb-4">{title}</h3>}
                <div className="py-4">
                    {children}
                </div>
            </div>
            <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
        </div>
    );
};

export default Modal;
