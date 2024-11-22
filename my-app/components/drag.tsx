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
import Sidebar, { AppSidebar } from './sidebar';
import { BtnGroup } from './btnGroup';
import { StringRender } from './stringNode';
import { EditorNode } from './editorNode';
import { Toaster } from './ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Button as ShardcnButton } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
let id = 0;
const getId = () => `${id++}`;



const nodeTypes = {
  StringNode: StringRender,
  EditNode: EditorNode,
};
const ProFlowDemo = () => {
  const editor = useFlowEditor();
  const { styles } = useStyles();
  const [open, setOpen] = useState(false);
  const [nodes, setNodes] = useState([])
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const { toast } = useToast()
  const onDrop = useCallback(

    (event) => {
      event.preventDefault();
      if (!editor) return;

      const { type, value } = JSON.parse(event.dataTransfer.getData('application/reactflow'));
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
        data: {
          title: `${type} node`,
          content: value,
        },
      };
      editor.addNode(newNode);
      setNodes((currentNodes) => [...currentNodes, newNode])
    },
    [editor],
  );

  const onSave = () => {
    nodes.forEach(node => {
      console.log(node.data.content);
    })
    toast({
      variant: 'default',
      title: "应用成功",
      description: "数据处理方案已保存并应用",
    })
  }

  return (
    <div className={styles.container}>
      <Toaster />
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
          
          <BtnGroup />
        </FlowPanel>
        <FlowPanel position={'top-left'}>
        <SidebarProvider>
            <AppSidebar />
          </SidebarProvider>
        </FlowPanel>
        <FlowPanel position={'bottom-center'}>
          <ShardcnButton onClick={onSave}>保存方案</ShardcnButton>
        </FlowPanel>
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