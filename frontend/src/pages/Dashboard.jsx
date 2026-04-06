import React, { useEffect } from "react";
import { Alert, Button, Card, Col, Empty, Progress, Row, Table } from "antd";
import { Link } from "react-router-dom";
import { ReloadOutlined } from "@ant-design/icons";

import { DashboardLayout } from "@/layout";
import { request } from "@/request";
import useOnFetch from "@/hooks/useOnFetch";

const OverviewCard = ({ title, value, color }) => (
  <Card
    bodyStyle={{ padding: 16 }}
    style={{ borderTop: `3px solid ${color}` }}
    title={title}
  >
    <div style={{ fontSize: 30, fontWeight: 700 }}>{value}</div>
  </Card>
);

export default function Dashboard() {
  const { onFetch, result, isLoading, isSuccess } = useOnFetch();

  const loadStatistics = async () => {
    await onFetch(() => request.get("studyhub/statistics"));
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  const overview = (result && result.overview) || {};
  const tasksByCourse = (result && result.tasksByCourse) || [];
  const tasksCount = overview.tasksCount || 0;
  const completedTasksCount = overview.completedTasksCount || 0;
  const completionRate = tasksCount
    ? Math.round((completedTasksCount * 100) / tasksCount)
    : 0;

  return (
    <DashboardLayout>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <h1 style={{ marginBottom: 0 }}>StudyHub 首页概览</h1>
          <p style={{ color: "#666", marginBottom: 0 }}>
            学习进度、任务状态与复习安排总览
          </p>
        </Col>
        <Col>
          <Button icon={<ReloadOutlined />} onClick={loadStatistics} loading={isLoading}>
            刷新数据
          </Button>
        </Col>
      </Row>

      {!isLoading && !isSuccess ? (
        <Alert
          showIcon
          type="warning"
          message="暂无概览数据"
          description="请先完成数据初始化，或稍后点击“刷新数据”重试。"
          style={{ marginBottom: 16 }}
        />
      ) : null}

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <OverviewCard title="课程总数" value={overview.coursesCount || 0} color="#2f54eb" />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <OverviewCard title="任务总数" value={overview.tasksCount || 0} color="#faad14" />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <OverviewCard
            title="已完成任务"
            value={overview.completedTasksCount || 0}
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <OverviewCard title="笔记数" value={overview.notesCount || 0} color="#13c2c2" />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <OverviewCard
            title="复习计划数"
            value={overview.reviewPlansCount || 0}
            color="#722ed1"
          />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <OverviewCard title="AI 使用次数" value={overview.aiUsageCount || 0} color="#eb2f96" />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <Card title="任务完成率" bodyStyle={{ padding: 12 }}>
            <Progress type="dashboard" percent={completionRate} />
          </Card>
        </Col>
      </Row>

      <div style={{ height: 20 }} />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="课程任务分布（Top）">
            {tasksByCourse.length ? (
              <Table
                rowKey={(item) => `${item._id}-course-task`}
                pagination={false}
                dataSource={tasksByCourse.slice(0, 6)}
                columns={[
                  {
                    title: "课程",
                    dataIndex: "_id",
                  },
                  {
                    title: "任务数",
                    dataIndex: "count",
                  },
                ]}
              />
            ) : (
              <Empty description="暂无课程任务分布数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="快捷入口">
            <p>
              <Link to="/course">进入课程管理</Link>
            </p>
            <p>
              <Link to="/task">进入学习任务</Link>
            </p>
            <p>
              <Link to="/note">进入学习笔记</Link>
            </p>
            <p>
              <Link to="/review-plan">进入复习计划</Link>
            </p>
            <p>
              <Link to="/statistics">进入统计分析</Link>
            </p>
            <p>
              <Link to="/ai-assistant">打开 AI 学习助手</Link>
            </p>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
