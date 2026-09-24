import styles  from './TabBar.module.scss'

import type { TabInterface } from "../types/tab"
import { Tab } from '../Tab';

interface TabBarComponent {
  tabs: TabInterface[],
  setTabs: React.Dispatch<React.SetStateAction<TabInterface[]>>;
}

export const TabBar : React.FC<TabBarComponent> = ({tabs, setTabs}) => {
  return (
    <nav className={styles['tab-bar']}>
      {tabs.map(tab => (
        <Tab key={tab.id} tab={tab}/>
      ))}
  </nav>
  )
}