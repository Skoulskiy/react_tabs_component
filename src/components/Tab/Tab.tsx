import styles from './Tab.module.scss';
import cn from 'classnames';

import type { TabInterface } from "../types/tab";
import { useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

interface TabComponent {
  tab: TabInterface
};

export const Tab : React.FC<TabComponent> = ({ tab }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tab.id});

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (<li 
      className={cn(styles['tab'], { [styles['tab--dragging']]: isDragging })}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
    <img src={tab.icon} alt={tab.label}/>
    <span>{tab.label}</span>
  </li>);
} 