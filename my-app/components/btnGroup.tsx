import { useFlowEditor } from '@ant-design/pro-flow';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';

export const BtnGroup = () => {
  const editor = useFlowEditor();
  const [count, setCount] = useState(0);

  const addMockNode = useCallback(() => {
    if (editor) {
      const id = Math.random();

      editor.addNode({
        id: `a${id}`,
        type: 'EditorNode',
        position: { x: count * 200, y: 100 },
        data: {
          title: 'Editor Node',
          handles: {
            source: 'a1-source',
            target: 'a1-target',
          },
        },
      });

      setCount((c) => c + 1);
    }
  }, [editor, count]);

  useEffect(() => {
    if (editor) {
      addMockNode();
    }
  }, []);

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
      <Button onClick={addMockNode}>新增节点</Button>
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