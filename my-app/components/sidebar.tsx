import useStyles from './css/sidebar.style';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default () => {
  const { styles, cx } = useStyles();

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className={styles.aside}>
      <div className={styles.description}>您可以将这些节点拖到上面的画布中</div>
      <div
        className={cx(styles.dndnode, styles.input)}
        onDragStart={(event) => onDragStart(event, 'StringNode')}
        draggable
      >
        传感器
      </div>
      <div
        className={cx(styles.dndnode, styles.input)}
        onDragStart={(event) => onDragStart(event, 'StringNode')}
        draggable
      >
        第三方系统
      </div>
      <div
        className={cx(styles.dndnode, styles.input)}
        onDragStart={(event) => onDragStart(event, 'StringNode')}
        draggable
      >
        数据库
      </div>
      <div
        className={cx(styles.dndnode, styles.input)}
        onDragStart={(event) => onDragStart(event, 'EditNode')}
        draggable
      >
        EditNode Node
      </div>
    </div>
  );
};