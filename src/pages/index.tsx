import React, { useEffect, useState } from 'react';
import { Layout, Input, Select, Button, message } from 'antd';
import G6, { Graph } from '@antv/g6';
import './index.less';

const { Sider, Content } = Layout;
const { Option } = Select;

const HomePage: React.FC = () => {
  const [data, setData] = useState({
    nodes: [
      {
        id: 'node1',
        label: 'node1',
        x: 100,
        y: 200,
      },
      {
        id: 'node2',
        label: 'node2',
        x: 300,
        y: 200,
      },
    ],
    // 边集
    edges: [
      // 表示一条从 node1 节点连接到 node2 节点的边
      {
        source: 'node1',
        target: 'node2',
      },
    ],
  }); // 数据源
  const [nodeCount, setNodeCount] = useState<number>(data.nodes.length);
  const [edgeCount, setEdgeCount] = useState<number>(data.edges.length);
  const ref = React.useRef(null);
  let graph: Graph | null = null;

  if (typeof window !== 'undefined')
    useEffect(() => {
      const container = ref.current as any;
      if (!graph) {
        const miniMap = new G6.Minimap();
        graph = new G6.Graph({
          container,
          width: container.scrollWidth || 500,
          height: container.scrollHeight || 500,
          defaultNode: {
            size: [60, 30],
            style: {
              fill: '#C6E5FF',
              stroke: '#5B8FF9',
            },
            labelCfg: {
              style: {
                fill: '#000000',
                fontSize: 12,
              },
              position: 'center',
              offset: 0,
              autoRotate: true,
              autoHide: true,
            },
          },
          defaultEdge: {
            style: {
              stroke: 'steelblue',
            },
          },
          modes: {
            default: ['drag-canvas', 'zoom-canvas'],
          },
        });
      }

      graph.data(data);

      graph.render();
      graph.paint();

      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };

      return () => {
        graph?.destroy();
        graph = null;
      };
    }, [data]);

  const [nodeSource, setNodeSource] = useState<string>(''); // 来源节点

  const handleAddNode = () => {
    // 处理添加节点的逻辑
    if (nodeLabel === '') {
      message.error('请输入节点名称');
      return;
    }

    if (nodeSource === '') {
      message.error('请选择来源节点');
      return;
    }

    if (data.nodes.find(item => item.id === nodeLabel)) {
      message.error('节点名称已存在');
      return;
    }

    setData({
      nodes: [
        ...data.nodes,
        {
          id: nodeLabel,
          label: nodeLabel,
          x: Math.random() * 500,
          y: Math.random() * 500,
        },
      ],
      edges: [
        ...data.edges,
        {
          source: nodeSource,
          target: nodeLabel,
        },
      ],
    });

    setNodeLabel('');
    setNodeSource('');

    setNodeCount(data.nodes.length + 1);
    setEdgeCount(data.edges.length + 1);

    message.success('添加成功');
  };

  const [nodeLabel, setNodeLabel] = useState<string>(''); // 节点名称
  const handleKeyPress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const charCode = event.target.value.charCodeAt(event.target.value.length - 1);
    if (
      (charCode >= 48 && charCode <= 57) || // 数字
      (charCode >= 65 && charCode <= 90) || // 大写字母
      (charCode >= 97 && charCode <= 122) || // 小写字母
      charCode === 95 || // _
      event.target.value === ''
    ) {
      setNodeLabel(event.target.value);
    } else {
      setNodeLabel('');
      message.error('节点名称只能输入数字、字母、_');
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={300} style={{ background: '#fff' }}>
        <div style={{ padding: '16px' }}>
          <div className="form-item">
            <p>
              当前节点和边的数量：{nodeCount} 个节点，{edgeCount} 条边
            </p>
          </div>
          <div className="form-item">
            <Input placeholder="请输入节点名称" value={nodeLabel} onChange={handleKeyPress} />
          </div>
          <div className="form-item">
            <Select style={{ width: '100%' }} placeholder="请选择聚类组">
              <Option value="a">聚类A</Option>
              <Option value="b">聚类B</Option>
              <Option value="c">聚类C</Option>
              <Option value="d">聚类D</Option>
            </Select>
          </div>
          <div className="form-item">
            <Select
              value={nodeSource}
              onChange={value => setNodeSource(value)}
              style={{ width: '100%' }}>
              {/* 画布中所有节点的 label */}
              <Option value="">请选择来源节点</Option>
              {data.nodes.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.id}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form-item">
            <Button type="primary" onClick={handleAddNode}>
              添加
            </Button>
          </div>
        </div>
      </Sider>
      <Layout>
        <Content style={{ height: '100%' }}>
          <div ref={ref}></div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
