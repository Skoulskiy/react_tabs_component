import { useState } from 'react'
import './App.css'

import type { TabInterface } from './components/types/tab';

import { TabBar } from './components/TabBar';

const getIcon = (label: string) => `/icons/${label.toLowerCase().replace(/\s+/g, '-')}.svg`;

const initialTabs: TabInterface[] = [
  { id: 1, label: 'Dashboard', url: '/dashboard', icon: getIcon('Dashboard'), isPinned: false },
  { id: 2, label: 'Banking', url: '/banking', icon: getIcon('Banking'), isPinned: false },
  { id: 3, label: 'Telefonie', url: '/telefonie', icon: getIcon('Telefonie'), isPinned: false },
  { id: 4, label: 'Accounting', url: '/accounting', icon: getIcon('Accounting'), isPinned: false },
  { id: 5, label: 'Verkauf', url: '/verkauf', icon: getIcon('Verkauf'), isPinned: false },
  { id: 6, label: 'Statistik', url: '/statistik', icon: getIcon('Statistik'), isPinned: false },
  { id: 7, label: 'Post Office', url: '/post', icon: getIcon('Post'), isPinned: false },
  { id: 8, label: 'Administration', url: '/administration', icon: getIcon('Administration'), isPinned: false },
  { id: 9, label: 'Help', url: '/help', icon: getIcon('Help'), isPinned: false },
  { id: 10, label: 'Warenbestand', url: '/warenbestand', icon: getIcon('Warenbestand'), isPinned: false },
  { id: 11, label: 'Auswahllisten', url: '/auswahllisten', icon: getIcon('Auswahllisten'), isPinned: false },
  { id: 12, label: 'Einkauf', url: '/einkauf', icon: getIcon('Einkauf'), isPinned: false },
  { id: 13, label: 'Rechn', url: '/rechn', icon: getIcon('Rechn'), isPinned: false },
]

function App() {
  const [tabs, setTabs] = useState<TabInterface[]>(initialTabs);


  return (
    <>
      <TabBar 
        tabs={tabs}
        setTabs={setTabs}
      />
    </>
  )
}

export default App
