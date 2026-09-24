import styles from './Tab.module.scss';
import cn from 'classnames';
import { forwardRef } from 'react';

import type { TabInterface } from "../types/tab";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TabComponent {
  tab: TabInterface;
  hidden?: boolean;
  onRemove?: (id: number) => void;
}

export const Tab = forwardRef<HTMLLIElement, TabComponent>(({ tab, hidden, onRemove }, ref) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    display: hidden ? 'none' : 'flex'
  };
  const isMainTab = tab.id === 1 || tab.url === '/main';

  return (
    <li
      className={cn(styles['tab'], { [styles['tab--dragging']]: isDragging })}
      ref={(el) => {
        setNodeRef(el);
        if (typeof ref === 'function') ref(el);
      }}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img src={tab.icon} alt={tab.label} />
      <span className={styles['tab__label']}>{tab.label}</span>
      
      {!isMainTab && onRemove && (
        <button 
          className={styles['tab__close']}
          onPointerDown={(e) => e.stopPropagation()} 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tab.id);
          }}
          title="Видалити"
        />
      )}
    </li>
  );
});