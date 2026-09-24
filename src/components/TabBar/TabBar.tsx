import styles from './TabBar.module.scss';
import type { TabInterface } from "../types/tab";
import { Tab } from '../Tab';

import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useResize } from '../hooks/useResize';
import { TabDropdown } from '../TabDropdown';

import PinIcon from '../../assets/icons/pin.svg'

interface TabBarComponent {
  tabs: TabInterface[];
  handleDragEnd: (event: DragEndEvent) => void;
  onRemove: (id: number) => void;
  currentPath: string;
  onSelect: (url: string) => void;
  onTogglePin: (id: number) => void;
}

export const TabBar: React.FC<TabBarComponent> = ({ tabs, handleDragEnd, onRemove, onTogglePin, currentPath, onSelect }) => {
  const containerRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; tab: TabInterface } | null>(null);

  const handleContextMenu = (e: React.MouseEvent, tab: TabInterface) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      tab,
    });
  };

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const containerWidth = useResize(containerRef);
  const tabWidthsRef = useRef<number[]>([]);

  const [visibleCount, setVisibleCount] = useState(tabs.length);

  useEffect(() => {
    tabWidthsRef.current = tabRefs.current.map(el => el?.offsetWidth ?? 0);
  }, [tabs]); 

  useLayoutEffect(() => {
    let total = 0;
    let count = 0;
    const dropdownSpace = 40; 

    for (let i = 0; i < tabWidthsRef.current.length; i++) {
      const width = tabWidthsRef.current[i];
      if (total + width > containerWidth - (i < tabWidthsRef.current.length - 1 ? dropdownSpace : 0)) break;
      total += width;
      count++;
    }

    setVisibleCount(count > 0 ? count : 1); 
  }, [containerWidth, tabs]);

  const hiddenTabs = tabs.slice(visibleCount);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={tabs.map(t => t.id)} strategy={horizontalListSortingStrategy}>
        <div className={styles['tab-bar-wrapper']}>
          <nav className={styles['tab-bar']} ref={containerRef}>
            {tabs.map((tab, index) => {
              const isHidden = index >= visibleCount;
              return (
                <Tab
                  key={tab.id}
                  tab={tab}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  hidden={isHidden}
                  isActive={currentPath === tab.url}
                  onContextMenu={handleContextMenu}
                  onRemove={onRemove}
                />
              );
            })}
          </nav>
          
          {hiddenTabs.length > 0 && (
            <TabDropdown 
              hiddenTabs={hiddenTabs} 
              onRemove={onRemove}
              onContextMenu={handleContextMenu} 
              onSelect={onSelect}
            />
          )}

          {contextMenu && (
            <div 
              className={styles['context-menu']}
              style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => {
                onTogglePin?.(contextMenu.tab.id);
                setContextMenu(null);
              }}>
                <img src={PinIcon} alt='Pin' />
                {contextMenu.tab.isPinned ? 'Unpin tab' : 'Pin tab'}
              </button>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};