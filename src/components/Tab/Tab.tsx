import styles from './Tab.module.scss';
import cn from 'classnames';
import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';

import type { TabInterface } from "../types/tab";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TabComponent {
  tab: TabInterface;
  hidden?: boolean;
  onRemove?: (id: number) => void;
  onContextMenu?: (e: React.MouseEvent, tab: TabInterface) => void;
  isActive?: boolean;
}

export const Tab = forwardRef<HTMLLIElement, TabComponent>(({ tab, hidden, onRemove, onContextMenu, isActive }, ref) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tab.id });
  const [isClickBlocked, setIsClickBlocked] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => { // додав захист від перетягування
    if (isClickBlocked || isDragging) {
      e.preventDefault(); 
    }
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    display: hidden ? 'none' : 'flex'
  };
  const isMainTab = tab.id === 1 || tab.url === '/main';

  return (
    <li
      className={cn(styles['tab'], { 
        [styles['tab--dragging']]: isDragging, 
        [styles['tab--active']]: isActive 
      })}
      ref={(el) => {
        setNodeRef(el);
        if (typeof ref === 'function') ref(el);
      }}
      style={style}
      onMouseDown={() => {
        setIsClickBlocked(false);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu?.(e, tab);
      }}
      {...attributes}
      {...listeners}
    >
      <Link to={tab.url} className={styles['tab__link']} onClick={handleLinkClick}>
        {tab.icon && <img src={tab.icon} alt={tab.label} />}
        <span className={styles['tab__label']}>{tab.label}</span>
      </Link>
      
      {!isMainTab && onRemove && (
        <button 
          className={styles['tab__close']}
          onPointerDown={(e) => e.stopPropagation()} 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tab.id);
          }}
        />
      )}
    </li>
  );
});