import useStyles from './css/sidebar.style';

export default () => {
  const { styles, cx } = useStyles();

  const onDragStart = (event, type, value) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({type, value}));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className={styles.aside}>
      <div className={styles.description}>您可以将这些节点拖到上面的画布中</div>
      <div>选择数据源类型</div>
      <div
        className={cx(styles.dndnode, styles.input)}
        onDragStart={(event) => onDragStart(event, 'StringNode', '传感器')}
        draggable
      >
        传感器
      </div>
      <div
        className={cx(styles.dndnode, styles.input)}
        onDragStart={(event) => onDragStart(event, 'StringNode', '第三方系统')}
        draggable
      >
        第三方系统
      </div>
      <div
        className={cx(styles.dndnode, styles.input)}
        onDragStart={(event) => onDragStart(event, 'StringNode', '数据库')}
        draggable
      >
        数据库
      </div>
      <div>选择处理方式</div>
      <div
        className={cx(styles.dndnode, styles.output)}
        onDragStart={(event) => onDragStart(event, 'EditNode', '时间升序')}
        draggable
      >
        时间升序
      </div>
      <div
        className={cx(styles.dndnode, styles.output)}
        onDragStart={(event) => onDragStart(event, 'EditNode', '时间降序')}
        draggable
      >
        时间降序
      </div>
    </div>
  );
};