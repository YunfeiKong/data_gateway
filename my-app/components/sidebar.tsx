import useStyles from './css/sidebar.style';
import { Button } from './ui/button';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from './ui/sidebar';

const mockData = [
  { type: '传感器', value: 'sensor-0', id: 0 },
  { type: '传感器', value: 'sensor-1', id: 1 },
  { type: '传感器', value: 'sensor-2', id: 2 },
  { type: '传感器', value: 'sensor-3', id: 3 },
  { type: '传感器', value: 'sensor-4', id: 4 },
  { type: '第三方系统', value: 'third-party-system-0', id: 5 },
  { type: '第三方系统', value: 'third-party-system-1', id: 6 },
  { type: '第三方系统', value: 'third-party-system-2', id: 7 },
  { type: '第三方系统', value: 'third-party-system-3', id: 8 },
  { type: '第三方系统', value: 'third-party-system-4', id: 9 },
  { type: '数据库', value: 'database-0', id: 10 },
  { type: '数据库', value: 'database-1', id: 11 },
  { type: '数据库', value: 'database-2', id: 12 },
  { type: '数据库', value: 'database-3', id: 13 },
  { type: '数据库', value: 'database-4', id: 14 }
];

const mockProcessMethod = [  
  { id: 0, method: '时间升序', description: '按时间从早到晚排序' },
  { id: 1, method: '时间降序', description: '按时间从晚到早排序' },
  { id: 2, method: '关键词过滤', description: '根据关键词过滤结果' },
  { id: 3, method: '数量升序', description: '按数量从少到多排序' },
  { id: 4, method: '数量降序', description: '按数量从多到少排序' },
];


export function AppSidebar({ children }) {
  const { styles, cx } = useStyles();

  const onDragStart = (event, type, value) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({type, value}));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Sidebar>
      <SidebarContent>
        {/* 数据源选择 */}
        <SidebarGroup>
          <SidebarGroupLabel>数据源选择</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mockData.map((md) => (
                <SidebarMenuItem key={md.id}>
                  <div onDragStart={(event) => onDragStart(event, 'StringNode', md.type + md.value)} draggable>
                    {md.value}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* 处理方式 */}
        <SidebarGroup>
          <SidebarGroupLabel>选择处理方式</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mockProcessMethod.map((method) => (
                <SidebarMenuItem key={method.id}>
                  <div onDragStart={(event) => onDragStart(event, 'EditNode', method.method)} draggable>
                    {method.method}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};