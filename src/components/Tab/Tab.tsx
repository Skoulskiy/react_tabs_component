import styles from './Tab.module.scss';

import type { TabInterface } from "../types/tab";

interface TabComponent {
  tab: TabInterface
};

export const Tab : React.FC<TabComponent> = ({ tab }) => {
  return (<li className={styles['tab']}>
    <img src={tab.icon} alt={tab.label}/>
    <span>{tab.label}</span>
  </li>);
} 