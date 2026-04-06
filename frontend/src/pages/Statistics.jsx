import React, { useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Empty,
  Progress,
  Row,
  Spin,
  Statistic,
  Table,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";

import { DashboardLayout } from "@/layout";
import { request } from "@/request";
import useOnFetch from "@/hooks/useOnFetch";

const statusLabelMap = {
  pending: "待办",
  completed: "已完成",
};

const normalizeStatus = (value) => statusLabelMap[value] || value || "其他";

export default function Statistics() {
  const { onFetch, result, isLoading, isSuccess } = useOnFetch();

  const loadStatistics = async () => {
    await onFetch(() => request.get("studyhub/statistics"));
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  const overview = (result && result.overview) || {};
  const tasksCount = overview.tasksCount || 0;
  const completedTasksCount = overview.completedTasksCount || 0;
  const completionRate = tasksCount
    ? Math.round((completedTasksCount * 100) / tasksCount)
    : 0;

  const tasksByCourse = (result && result.tasksByCourse) || [];
  const notesByCourse = (result && result.notesByCourse) || [];
  const tasksByStatus = (result && result.tasksByStatus) || [];
  const reviewPlansByStatus = (result && result.reviewPlansByStatus) || [];

  return (
    <DashboardLayout>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <h1 style={{ marginBottom: 0 }}>StudyHub 数据统计</h1>
          <p style={{ marginBottom: 0, color: "#666" }}>
            基于课程、任务、笔记与复习计划的学习数据分析
          </p>
        </Col>
        <Col>
          <Button icon={<ReloadOutlined />} onClick={loadStatistics} loading={isLoading}>
            刷新统计
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: 100 }}>
          <Spin size="large" />
        </div>
      ) : null}

      {!isLoading && !isSuccess ? (
        <Alert type="warning" showIcon message="暂无统计数据，请稍后重试" />
      ) : null}

      {isSuccess ? (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8} lg={6}>
              <Card>
                <Statistic title="课程总数" value={overview.coursesCount || 0} />
              </Card>
            </Col>
            <Col xs={24} md={8} lg={6}>
              <Card>
                <Statistic title="任务总数" value={tasksCount} />
              </Card>
            </Col>
            <Col xs={24} md={8} lg={6}>
              <Card>
                <Statistic title="已完成任务" value={completedTasksCount} />
              </Card>
            </Col>
            <Col xs={24} md={8} lg={6}>
              <Card>
                <Statistic title="笔记数量" value={overview.notesCount || 0} />
              </Card>
            </Col>
            <Col xs={24} md={8} lg={6}>
              <Card>
                <Statistic title="复习计划数量" value={overview.reviewPlansCount || 0} />
              </Card>
            </Col>
            <Col xs={24} md={8} lg={6}>
              <Card>
                <Statistic title="AI 使用次数" value={overview.aiUsageCount || 0} />
              </Card>
            </Col>
            <Col xs={24} md={16} lg={18}>
              <Card title="任务完成率">
                <Progress percent={completionRate} status="active" />
              </Card>
            </Col>
          </Row>

          <div style={{ height: 24 }} />

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="课程任务分布">
                {tasksByCourse.length ? (
                  <Table
                    rowKey={(item) => `${item._id}-task`}
                    pagination={false}
                    dataSource={tasksByCourse}
                    columns={[
                      { title: "课程", dataIndex: "_id" },
                      { title: "任务数", dataIndex: "count" },
                    ]}
                  />
                ) : (
                  <Empty description="暂无数据" />
                )}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="课程笔记分布">
                {notesByCourse.length ? (
                  <Table
                    rowKey={(item) => `${item._id}-note`}
                    pagination={false}
                    dataSource={notesByCourse}
                    columns={[
                      { title: "课程", dataIndex: "_id" },
                      { title: "笔记数", dataIndex: "count" },
                    ]}
                  />
                ) : (
                  <Empty description="暂无数据" />
                )}
              </Card>
            </Col>
          </Row>

          <div style={{ height: 24 }} />

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="任务状态统计">
                {tasksByStatus.length ? (
                  <Table
                    rowKey={(item) => `${item._id}-task-status`}
                    pagination={false}
                    dataSource={tasksByStatus}
                    columns={[
                      {
                        title: "状态",
                        dataIndex: "_id",
                        render: normalizeStatus,
                      },
                      { title: "数量", dataIndex: "count" },
                    ]}
                  />
                ) : (
                  <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="复习计划状态统计">
                {reviewPlansByStatus.length ? (
                  <Table
                    rowKey={(item) => `${item._id}-review-status`}
                    pagination={false}
                    dataSource={reviewPlansByStatus}
                    columns={[
                      {
                        title: "状态",
                        dataIndex: "_id",
                        render: normalizeStatus,
                      },
                      { title: "数量", dataIndex: "count" },
                    ]}
                  />
                ) : (
                  <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Card>
            </Col>
          </Row>
        </>
      ) : null}
    </DashboardLayout>
  );
}
