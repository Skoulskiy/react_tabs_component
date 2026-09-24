import { useEffect, useState } from "react"
import type { TabInterface } from "../types/tab"
import { arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";

export const useTabs = (initialTabs : TabInterface[]) => {
  const [tabs, setTabs] = useState<TabInterface []>(() => {
    const saved = localStorage.getItem('tabs');
    return saved ? JSON.parse(saved) : initialTabs;
  })

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if(!over || active.id === over.id) return;

    setTabs(tabs => {
      const oldIndex = tabs.findIndex(t => t.id === active.id);
      const newIndex = tabs.findIndex(t => t.id === over.id);
  
      return arrayMove(tabs, oldIndex, newIndex);
    })
  }

  return {tabs, setTabs, handleDragEnd};
}