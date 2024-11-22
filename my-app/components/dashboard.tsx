'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, Database, Filter, Link, Plus, AlertCircle, BarChart } from "lucide-react"
import { FlowView, useNodesState, FlowEditor, FlowEditorProvider, FlowPanel } from '@ant-design/pro-flow';
import FlowDemo from './drag'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export function DashboardComponent() {
  const [dataSourceCount, setDataSourceCount] = useState(0)
  const [processedDataCount, setProcessedDataCount] = useState(0)
  const [filteredDataCount, setFilteredDataCount] = useState(0)
  const [blockchainTransactions, setBlockchainTransactions] = useState(0)
  const [selectedDataSource, setSelectedDataSource] = useState(null)
  const [showDataProcessingOptions, setShowDataProcessingOptions] = useState(false)
  const [processingOptions, setProcessingOptions] = useState({
    keywordFilter: false,
    timeFilter: false,
    sorting: false
  })
  const [sortingMethod, setSortingMethod] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDataSources, setSelectedDataSources] = useState({})
  const [dataSources, setDataSources] = useState({
    sensor: [
      { name: "温度传感器", interface: "/api/sensor/temperature", jsonExample: '{"temp": 25.5, "humidity": 60}', grade: "高" },
      { name: "压力传感器", interface: "/api/sensor/pressure", jsonExample: '{"pressure": 1013.25}', grade: "中" }
    ],
    thirdParty: [
      { name: "天气API", interface: "/api/weather", jsonExample: '{"city": "北京", "temp": 20, "condition": "晴朗"}', grade: "中" },
      { name: "库存系统", interface: "/api/inventory", jsonExample: '{"productId": "A001", "quantity": 100}', grade: "高" }
    ],
    database: [
      { name: "生产数据库", interface: "/api/db/production", jsonExample: '{"orderId": "ORD001", "status": "进行中"}', grade: "高" },
      { name: "用户数据库", interface: "/api/db/users", jsonExample: '{"userId": "U001", "name": "张三"}', grade: "中" }
    ]
  })
  const [savedProcessingSchemes, setSavedProcessingSchemes] = useState([])
  const [isDataProcessingDialogOpen, setIsDataProcessingDialogOpen] = useState(false)
  const [blockchainStats, setBlockchainStats] = useState({
    sensor: { total: 0, lastDay: 0 },
    thirdParty: { total: 0, lastDay: 0 },
    database: { total: 0, lastDay: 0 }
  })
  const { toast } = useToast()

  useEffect(() => {
    const interval = setInterval(() => {
      setDataSourceCount(prev => (prev + Math.floor(Math.random() * 3)) % 100)
      setProcessedDataCount(prev => (prev + Math.floor(Math.random() * 5)) % 1000)
      setFilteredDataCount(prev => (prev + Math.floor(Math.random() * 2)) % 500)
      setBlockchainTransactions(prev => (prev + Math.floor(Math.random() * 1)) % 200)

      // Update blockchain stats
      setBlockchainStats(prev => ({
        sensor: {
          total: prev.sensor.total + Math.floor(Math.random() * 3),
          lastDay: Math.floor(Math.random() * 50)
        },
        thirdParty: {
          total: prev.thirdParty.total + Math.floor(Math.random() * 2),
          lastDay: Math.floor(Math.random() * 30)
        },
        database: {
          total: prev.database.total + Math.floor(Math.random() * 4),
          lastDay: Math.floor(Math.random() * 70)
        }
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const initialSelectedDataSources = {}
    Object.keys(dataSources).forEach(sourceType => {
      dataSources[sourceType].forEach((source, index) => {
        initialSelectedDataSources[`${sourceType}-${index}`] = false
      })
    })
    setSelectedDataSources(initialSelectedDataSources)
  }, [dataSources])

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log("文件已上传:", file.name)
    }
  }

  const handleProcessingOptionChange = (option) => {
    setProcessingOptions(prev => ({ ...prev, [option]: !prev[option] }))
  }

  const handleGradeChange = (sourceType, index, newGrade) => {
    setDataSources(prev => ({
      ...prev,
      [sourceType]: prev[sourceType].map((item, i) =>
        i === index ? { ...item, grade: newGrade } : item
      )
    }))
  }

  const handleDataSourceSelection = (sourceKey) => {
    setSelectedDataSources(prev => ({
      ...prev,
      [sourceKey]: !prev[sourceKey]
    }))
  }

  const handleApplyProcessingScheme = () => {
    const newScheme = {
      id: Date.now(),
      options: processingOptions,
      sortingMethod,
      selectedDataSources: Object.entries(selectedDataSources)
        .filter(([_, isSelected]) => isSelected)
        .map(([key]) => key)
    }
    setSavedProcessingSchemes(prev => [...prev, newScheme])
    setIsDataProcessingDialogOpen(false)
    toast({
      variant: 'default',
      title: "应用成功",
      description: "数据处理方案已保存并应用",
    })
  }

  const renderOverviewTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2" />
            多源异构数据接入
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{dataSourceCount}</div>
          <Progress value={dataSourceCount} className="w-full" />
          <div className="mt-2 flex space-x-2">
            <Badge>传感器</Badge>
            <Badge>第三方系统</Badge>
            <Badge>数据库</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowUpDown className="mr-2" />
            数据解析与标准化
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{processedDataCount}</div>
          <Progress value={(processedDataCount / 1000) * 100} className="w-full" />
          <div className="mt-2">已处理数据量</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2" />
            数据分级筛选
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{filteredDataCount}</div>
          <Progress value={(filteredDataCount / 500) * 100} className="w-full" />
          <div className="mt-2 flex space-x-2">
            <Badge variant="secondary">高价值</Badge>
            <Badge variant="secondary">中价值</Badge>
            <Badge variant="secondary">低价值</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="mr-2" />
            区块链上链
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{blockchainTransactions}</div>
          <Progress value={(blockchainTransactions / 200) * 100} className="w-full" />
          <div className="mt-2">已上链交易数</div>
        </CardContent>
      </Card>
    </div>
  )


  const renderDataProcessFlowTab = () => {
    return (
      <FlowEditorProvider>
        <FlowDemo />
      </FlowEditorProvider>
    );
  };


  const renderDataGradingTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>数据分级</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>数据来源</TableHead>
              <TableHead>接口</TableHead>
              <TableHead>当前分级</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(dataSources).flatMap(([sourceType, sources]) =>
              sources.map((source, index) => (
                <TableRow key={`${sourceType}-${index}`}>
                  <TableCell>{source.name}</TableCell>
                  <TableCell>{source.interface}</TableCell>
                  <TableCell>{source.grade}</TableCell>
                  <TableCell>
                    <Select
                      value={source.grade}
                      onValueChange={(newGrade) => handleGradeChange(sourceType, index, newGrade)}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="选择分级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="高">高</SelectItem>
                        <SelectItem value="中">中</SelectItem>
                        <SelectItem value="低">低</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  const renderDataProcessingTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>数据处理方案</CardTitle>
      </CardHeader>
      <CardContent>
        {savedProcessingSchemes.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>暂无数据处理方案</AlertTitle>
            <AlertDescription>
              请点击顶部导航栏的"数据处理"按钮创建新的数据处理方案。
            </AlertDescription>
          </Alert>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>处理选项</TableHead>
                <TableHead>排序方法</TableHead>
                <TableHead>选中的数据源</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedProcessingSchemes.map((scheme) => (
                <TableRow key={scheme.id}>
                  <TableCell>{scheme.id}</TableCell>
                  <TableCell>
                    {Object.entries(scheme.options)
                      .filter(([_, value]) => value)
                      .map(([key]) => key)
                      .join(', ')}
                  </TableCell>
                  <TableCell>{scheme.sortingMethod || '无'}</TableCell>
                  <TableCell>{scheme.selectedDataSources.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )

  const renderBlockchainTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2" />
            区块链数据统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>数据类型</TableHead>
                <TableHead>总上链数据量</TableHead>
                <TableHead>最近24小时上链数据量</TableHead>
                <TableHead>占比</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(blockchainStats).map(([type, stats]) => (
                <TableRow key={type}>
                  <TableCell>{type === 'sensor' ? '传感器' : type === 'thirdParty' ? '第三方系统' : '数据库'}</TableCell>
                  <TableCell>{stats.total}</TableCell>
                  <TableCell>{stats.lastDay}</TableCell>
                  <TableCell>
                    <Progress value={(stats.lastDay / stats.total) * 100} className="w-[100px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(blockchainStats).map(([type, stats]) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle>{type === 'sensor' ? '传感器' : type === 'thirdParty' ? '第三方系统' : '数据库'}</CardTitle>
            </CardHeader>
            <CardContent>

              <div className="text-2xl font-bold mb-2">{stats.total}</div>
              <Progress value={(stats.lastDay / stats.total) * 100} className="w-full" />
              <div className="mt-2">最近24小时: {stats.lastDay}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl cursor-pointer" onClick={() => setActiveTab("overview")}>
                工业互联网数据处理与区块链系统
              </span>
            </div>
            <div className="flex space-x-4">
              <Toaster />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">数据接入</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>选择数据源类型</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.keys(dataSources).map((sourceType) => (
                    <DropdownMenuItem key={sourceType} onSelect={() => setSelectedDataSource(sourceType)}>
                      {sourceType === 'sensor' ? '传感器' : sourceType === 'thirdParty' ? '第三方系统' : '数据库'}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => document.getElementById('file-upload').click()}>
                    <Plus className="mr-2 h-4 w-4" />
                    新增接入
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <input
                id="file-upload"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <Button variant="ghost" onClick={() => setActiveTab("dataProcessFlow")}>数据处理</Button>
              <Button variant="ghost" onClick={() => setActiveTab("dataGrading")}>数据分级</Button>
              <Button variant="ghost" onClick={() => setActiveTab("dataProcessing")}>处理方案</Button>
              <Button variant="ghost" onClick={() => setActiveTab("blockchain")}>区块链</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === "overview" && renderOverviewTab()}
        {activeTab === "dataGrading" && renderDataGradingTab()}
        {activeTab === "dataProcessFlow" && renderDataProcessFlowTab()}
        {activeTab === "dataProcessing" && renderDataProcessingTab()}
        {activeTab === "blockchain" && renderBlockchainTab()}
      </main>

      {selectedDataSource && (
        <Dialog open={!!selectedDataSource} onOpenChange={() => setSelectedDataSource(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedDataSource === 'sensor' ? '传感器' : selectedDataSource === 'thirdParty' ? '第三方系统' : '数据库'}数据接口
              </DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              {dataSources[selectedDataSource].map((source, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">{source.name}</h3>
                  <p>接口: {source.interface}</p>
                  <p>JSON示例:</p>
                  <pre className="bg-gray-100 p-2 rounded">{source.jsonExample}</pre>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}