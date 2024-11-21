import { EditNode, Handle, Position, NodeField ,TextArea  } from '@ant-design/pro-flow';
import { FC } from 'react';
import useStyles from './css/probase';
  
export const EditorNode: FC = (node: any) => {
  const { handles, id, selected } = node;
  const { styles, cx } = useStyles();

  return (
    <div className={cx(styles.editNode, selected && 'selected')}>
      <Handle
        id={typeof handles?.target === 'string' ? handles?.target : id}
        type={'target'}
        position={Position.Left}
      />

      <EditNode.Preview title={`${node.data.content}`}>
      {/* <NodeField id={'sourceId'} title={'变量名'}>
          <TextArea placeholder={'输入数据源'} type={'block'} value = {node.content} />
        </NodeField> */}
        {/* <NodeField id={'sourceId'} title={'数据来源'}>
          来源
        </NodeField> */}
      </EditNode.Preview>

      <Handle
        id={typeof handles?.source === 'string' ? handles?.source : id}
        type={'source'}
        position={Position.Right}
      />
    </div>
  );
};