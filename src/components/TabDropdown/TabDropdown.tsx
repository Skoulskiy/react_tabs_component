import { useState, useRef, useEffect } from "react";
import type { TabInterface } from "../types/tab";

import styles from './TabDropdown.module.scss';
import arrowIcon from '../../assets/icons/arrow.svg';

import cn from 'classnames';

interface TabDropdownComponent {
  hiddenTabs: TabInterface[];
}

export const TabDropdown: React.FC<TabDropdownComponent> = ({ hiddenTabs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    if (isOpen) {
      window.addEventListener('scroll', handleClose, true);
      window.addEventListener('resize', handleClose);
    }
    return () => {
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdown}>
      <button 
        ref={buttonRef}
        onClick={toggleDropdown} 
        className={cn(styles.arrow, {
          [styles['arrow--opened']]: isOpen,
          [styles['arrow--closed']]: !isOpen,
        })}
      >
        <img src={arrowIcon} alt="arrow" />
      </button>

      {isOpen && (
        <ul 
          className={styles['dropdown__list']}
          style={{ top: `${coords.top}px`, right: `${coords.right}px` }}
        >
          {hiddenTabs.map(tab => (
            <li key={tab.id}>
              {tab.icon && <img src={tab.icon} alt={tab.label} />}
              <span>{tab.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};