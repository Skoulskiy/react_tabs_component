import styles from './Tab.module.scss';
import cn from 'classnames';
import { forwardRef } from 'react';

import type { TabInterface } from "../types/tab";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TabComponent {
  tab: TabInterface;
  hidden?: boolean;
}

export const Tab = forwardRef<HTMLLIElement, TabComponent>(({ tab, hidden }, ref) => { // прийшлось використовувати forwardRef
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    display: hidden ? 'none' : 'flex'
  };

  return (
    <li
      className={cn(styles['tab'], { [styles['tab--dragging']]: isDragging })}
      ref={(el) => {
        setNodeRef(el);
        if (typeof ref === 'function') ref(el);
      }}
      {...attributes}
      {...listeners}
      style={style}
    >
      <img src={tab.icon} alt={tab.label} />
      <span>{tab.label}</span>
    </li>
  );
});