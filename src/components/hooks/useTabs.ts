import { useEffect, useState } from "react";
import type { TabInterface } from "../types/tab";
import { arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";

export const useTabs = (initialTabs: TabInterface[], navigate?: (path: string) => void, currentPath?: string) => {
  const [tabs, setTabs] = useState<TabInterface[]>(() => {
    const saved = localStorage.getItem('tabs');
    return saved ? JSON.parse(saved) : initialTabs;
  });

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTabs(prevTabs => {
      const oldIndex = prevTabs.findIndex(t => t.id === active.id);
      const newIndex = prevTabs.findIndex(t => t.id === over.id);
  
      return arrayMove(prevTabs, oldIndex, newIndex);
    });
  };

  const onRemove = (id: number) => {
    const tabToRemove = tabs.find(tab => tab.id === id);
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);

    if (tabToRemove && tabToRemove.url === currentPath && navigate) {
      const fallbackTab = newTabs[0];
      if (fallbackTab) {
        navigate(fallbackTab.url);
      }
    }
  };

  const onTogglePin = (id: number) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === id ? { ...tab, isPinned: !tab.isPinned } : tab
      )
    );
  };

  return { tabs, setTabs, handleDragEnd, onRemove, onTogglePin };
};