import styles  from './TabBar.module.scss'

import type { TabInterface } from "../types/tab"
import { Tab } from '../Tab';

import { DndContext } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

interface TabBarComponent {
  tabs: TabInterface[],
  setTabs: React.Dispatch<React.SetStateAction<TabInterface[]>>;
}

export const TabBar : React.FC<TabBarComponent> = ({tabs, setTabs}) => {

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if(!over || active.id === over.id) return;

    setTabs(tabs => {
      const oldIndex = tabs.findIndex(t => t.id === active.id);
      const newIndex = tabs.findIndex(t => t.id === over.id);
  
      return arrayMove(tabs, oldIndex, newIndex);
    })
  }
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