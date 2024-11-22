import { useFlowEditor } from '@ant-design/pro-flow';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';

export const BtnGroup = () => {
  const editor = useFlowEditor();
  const [count, setCount] = useState(0);

  return (
    <>
      <Button
        onClick={() => {
          editor.selectAll();
        }}
      >
        全选
      </Button>
      <Button
        onClick={() => {
          editor.deselectAll();
        }}
      >
        取消全选
      </Button>
      <br />
      {/* <Button onClick={addMockNode}>新增节点</Button> */}
      <Button
        onClick={() => {
          editor.getSelectedKeys().forEach((id) => {
            editor.deleteNode(id);
          });
        }}
      >
        删除选中节点
      </Button>
      <br />
      <Button onClick={() => editor.undo()}>撤销</Button>
      <Button onClick={() => editor.redo()}>重做</Button>
    </>
  );
};