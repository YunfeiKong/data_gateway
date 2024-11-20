import {
    BasicNode,
    EditNode,
    FlowEditor,
    FlowEditorProvider,
    FlowPanel,
    Inspector,
    useFlowEditor,
  } from '@ant-design/pro-flow';
  import { Button } from 'antd';
  import { useCallback, useEffect, useState } from 'react';
  import useStyles from './css/dragAddNode';
  import Sidebar from './sidebar';
  import { BtnGroup } from './btnGroup';
  import { StringRender } from './stringNode';
  import { EditorNode } from './editorNode';
  let id = 0;
  const getId = () => `node_${id++}`;
  
  const nodeTypes = {
    StringNode: StringRender,
    EditNode: EditorNode,
  };
  const ProFlowDemo = () => {
    const editor = useFlowEditor();
    const { styles } = useStyles();
    const [open, setOpen] = useState(false);
  
    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
  
    const onDrop = useCallback(
      
      (event) => {
        event.preventDefault();
        if (!editor) return;
  
        const type = event.dataTransfer.getData('application/reactflow');
        if (typeof type === 'undefined' || !type) {
          return;
        }
  
        const position = editor.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          content: {
            a: '123',
          },
          data: {
            title: `${type} node`,
            content: '123',
          },
        };
  
        editor.addNode(newNode);
      },
      [editor],
    );

  
    return (
      <div className={styles.container}>
        <FlowEditor
          nodeTypes={nodeTypes}
          flowProps={{
            onDrop,
            onDragOver,
            onPaneClick: () => setOpen(false),
          }}
          miniMap={true}
          devtools={true}
        >
          <FlowPanel position={'top-center'}>
            <Button onClick={() => setOpen(true)}>Open Nodes Inspector</Button>
            <BtnGroup></BtnGroup>
          </FlowPanel>
          <Inspector open={open} onClick={() => setOpen(false)}>
            <Sidebar />
          </Inspector>
        </FlowEditor>
      </div>
    );
  };
  
  const FlowDemo = () => {
    return (
      <FlowEditorProvider>
        <ProFlowDemo />
      </FlowEditorProvider>
    );
  };
  
  export default FlowDemo;