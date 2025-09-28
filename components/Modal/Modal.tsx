import { useEffect, useRef, useState } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';


interface ModalProps {
 onClose: () => void;
 children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
 const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
 const modalRef = useRef<HTMLDivElement>(null); 

 useEffect(() => {
        const rootElement = document.getElementById('modal-root');
        setModalRoot(rootElement);
        
 const handleKeyDown = (event: KeyboardEvent) => {
 if (event.key === 'Escape') {
 onClose();
 }
 };
        
 const handleClickOutside = (event: MouseEvent) => {
            
 if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                if ((event.target as HTMLElement).classList.contains(css.backdrop)) {
                    onClose();
                }
 }
 };

 window.addEventListener('keydown', handleKeyDown);
 window.addEventListener('mousedown', handleClickOutside);
 document.body.style.overflow = 'hidden';

 return () => {
 window.removeEventListener('keydown', handleKeyDown);
 window.removeEventListener('mousedown', handleClickOutside);
 document.body.style.overflow = 'auto'; 
 };
 }, [onClose]);

 if (!modalRoot) {
 return null;
 }

 return createPortal (
 <div className={css.backdrop}
 role="dialog"
 aria-modal="true"
 >
 <div className={css.modal} ref={modalRef}>
 {children}
 </div>
 </div>,
 modalRoot
 );
}