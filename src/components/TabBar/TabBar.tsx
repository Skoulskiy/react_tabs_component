import styles  from './TabBar.module.scss'

import type { TabInterface } from "../types/tab"
import { Tab } from '../Tab';

import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

interface TabBarComponent {
  tabs: TabInterface[],
  setTabs: React.Dispatch<React.SetStateAction<TabInterface[]>>;
  handleDragEnd: (event : DragEndEvent) => void;
}

export const TabBar : React.FC<TabBarComponent> = ({tabs, setTabs, handleDragEnd}) => {

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={tabs.map(t => t.id)} strategy={horizontalListSortingStrategy}>
        <nav className={styles['tab-bar']}>
          {tabs.map(tab => (
            <Tab key={tab.id} tab={tab}/>
          ))}
      </nav>
      </SortableContext>
    </DndContext>
  )
}