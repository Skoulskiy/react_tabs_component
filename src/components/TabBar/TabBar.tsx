import styles  from './TabBar.module.scss'

import type { TabInterface } from "../types/tab"
import { Tab } from '../Tab';

import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useLayoutEffect, useRef, useState , useEffect} from 'react';
import { useResize } from '../hooks/useResize';
import { TabDropdown } from '../TabDropdown';

interface TabBarComponent {
  tabs: TabInterface[],
  setTabs: React.Dispatch<React.SetStateAction<TabInterface[]>>;
  handleDragEnd: (event : DragEndEvent) => void;
}

export const TabBar : React.FC<TabBarComponent> = ({tabs, setTabs, handleDragEnd}) => {
  const containerRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  const containerWidth = useResize(containerRef);
  const tabWidthsRef = useRef<number[]>([]);

  const [visibleCount, setVisibleCount] = useState(tabs.length);

  useEffect(() => {
    tabWidthsRef.current = tabRefs.current.map(el => el?.offsetWidth ?? 0);
  }, [tabs]); 

  useLayoutEffect(() => {
    let total = 0;
    let count = 0;

    for (const width of tabWidthsRef.current) {
      total += width;
      if (total > containerWidth) break;
      count++;
    }

    setVisibleCount(count);
  }, [containerWidth]);
  const hiddenTabs = tabs.slice(visibleCount);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={tabs.map(t => t.id)} strategy={horizontalListSortingStrategy}>
        <div className={styles['tab-bar-wrapper']}>
          <nav className={styles['tab-bar']} ref={containerRef}>
            {tabs.map((tab, index) => (
              <Tab
                key={tab.id}
                tab={tab}
                ref={(el) => { tabRefs.current[index] = el; }}
                hidden={index >= visibleCount}
              />
            ))}
          </nav>
          {hiddenTabs.length > 0 && <TabDropdown hiddenTabs={hiddenTabs} />}
        </div>
      </SortableContext>
    </DndContext>
  );
}