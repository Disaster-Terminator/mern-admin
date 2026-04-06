import React, { useEffect } from "react";
import { Alert, Button, Card, Col, Empty, Progress, Row, Table } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

import { DashboardLayout } from "@/layout";
import { request } from "@/request";
import useOnFetch from "@/hooks/useOnFetch";

const statusLabelMap = {
  pending: "待办",
  completed: "已完成",
};

const getStatusCount = (list = [], status) => {
  const matchedItem = list.find((item) => item._id === status);
  return matchedItem ? matchedItem.count : 0;
};

const CompactMetricCard = ({ title, value, hint, accentClass }) => (
  <Card className={`studyhubCompactMetricCard ${accentClass || ""}`} bordered={false}>
    <p>{title}</p>
    <strong>{value}</strong>
    <span>{hint}</span>
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
  const notesByCourse = (result && result.notesByCourse) || [];
  const tasksByStatus = (result && result.tasksByStatus) || [];
  const reviewPlansByStatus = (result && result.reviewPlansByStatus) || [];

  const tasksCount = overview.tasksCount || 0;
  const completedTasksCount = overview.completedTasksCount || 0;
  const pendingTasksCount = Math.max(tasksCount - completedTasksCount, 0);
  const completionRate = tasksCount
    ? Math.round((completedTasksCount * 100) / tasksCount)
    : 0;

  const pendingReviewPlansCount = getStatusCount(reviewPlansByStatus, "pending");
  const completedReviewPlansCount = getStatusCount(reviewPlansByStatus, "completed");

  const notesCountByCourse = notesByCourse.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  const courseFocusList = tasksByCourse
    .slice(0, 5)
    .map((item) => {
      const notesCount = notesCountByCourse[item._id] || 0;
      const gap = Math.max(item.count - notesCount, 0);

      let focusText = "任务与笔记覆盖较均衡";
      if (notesCount === 0 && item.count > 0) {
        focusText = "任务推进中，建议补充课堂笔记";
      } else if (gap >= 2) {
        focusText = "任务增长较快，建议同步整理知识点";
      }

      return {
        course: item._id,
        tasksCount: item.count,
        notesCount,
        focusText,
      };
    })
    .filter((item) => item.tasksCount > 0);

  const tasksByCourseColumns = [
    {
      title: "课程",
      dataIndex: "_id",
      ellipsis: true,
    },
    {
      title: "任务数",
      dataIndex: "count",
      align: "right",
      render: (value) => <span className="studyhubDashboardTableCount">{value}</span>,
    },
  ];

  const completionStatus =
    completionRate >= 80 ? "progress-excellent" : completionRate >= 50 ? "progress-stable" : "progress-focus";

  return (
    <DashboardLayout>
      <section className="studyhubDashboardHero">
        <div className="studyhubDashboardHeroMeta">
          <p className="studyhubDashboardHeroKicker">StudyHub Dashboard</p>
          <h1>学习执行总览</h1>
          <p>围绕课程、任务、复习与笔记的学习进展看板</p>
        </div>
        <div className="studyhubDashboardHeroAction">
          <Button type="primary" icon={<ReloadOutlined />} onClick={loadStatistics} loading={isLoading}>
            刷新概览
          </Button>
        </div>
      </section>

      {!isLoading && !isSuccess ? (
        <Alert
          showIcon
          type="warning"
          message="暂无概览数据"
          description="请先完成数据初始化，或稍后点击“刷新概览”重试。"
          className="studyhubDashboardAlert"
        />
      ) : null}

      <Row gutter={[16, 16]} className="studyhubDashboardMetricsSection">
        <Col xs={24} xl={14}>
          <Card className="studyhubDashboardProgressCard" bordered={false}>
            <div className="studyhubDashboardProgressHead">
              <div>
                <p>学习执行进度</p>
                <h2>{completionRate}% 任务已完成</h2>
              </div>
              <div className="studyhubDashboardProgressBadge">
                <span>当前待完成</span>
                <strong>{pendingTasksCount}</strong>
              </div>
            </div>

            <Progress
              percent={completionRate}
              showInfo={false}
              strokeColor={completionRate >= 80 ? "#16a34a" : completionRate >= 50 ? "#2563eb" : "#d97706"}
            />

            <div className="studyhubDashboardProgressMeta">
              <div>
                <span>任务总数</span>
                <strong>{tasksCount}</strong>
              </div>
              <div>
                <span>已完成任务</span>
                <strong>{completedTasksCount}</strong>
              </div>
              <div>
                <span>复习待办</span>
                <strong>{pendingReviewPlansCount}</strong>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} xl={10}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} xl={24}>
              <CompactMetricCard
                title="课程总数"
                value={overview.coursesCount || 0}
                hint="课程结构与课堂安排"
                accentClass="metric-blue"
              />
            </Col>
            <Col xs={24} sm={12} xl={24}>
              <CompactMetricCard
                title="复习计划"
                value={overview.reviewPlansCount || 0}
                hint={`${completedReviewPlansCount} 项已完成`}
                accentClass="metric-violet"
              />
            </Col>
            <Col xs={24} sm={12} xl={24}>
              <CompactMetricCard
                title="学习笔记"
                value={overview.notesCount || 0}
                hint="持续沉淀课程知识点"
                accentClass="metric-cyan"
              />
            </Col>
            <Col xs={24} sm={12} xl={24}>
              <CompactMetricCard
                title="AI 助手使用"
                value={overview.aiUsageCount || 0}
                hint="辅助任务拆解与复盘"
                accentClass="metric-pink"
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="studyhubDashboardInsightSection">
        <Col xs={24} xl={14}>
          <Card className="studyhubDashboardPanel" title="课程任务负载">
            {tasksByCourse.length ? (
              <Table
                rowKey={(item) => `${item._id}-course-task`}
                pagination={false}
                dataSource={tasksByCourse.slice(0, 8)}
                columns={tasksByCourseColumns}
              />
            ) : (
              <Empty description="暂无课程任务分布数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Card>
        </Col>
        <Col xs={24} xl={10}>
          <Card className="studyhubDashboardPanel" title="执行状态概览">
            <div className="studyhubDashboardStatusGrid">
              <div className="studyhubDashboardStatusItem">
                <span>任务{statusLabelMap.pending}</span>
                <strong>{getStatusCount(tasksByStatus, "pending")}</strong>
              </div>
              <div className="studyhubDashboardStatusItem">
                <span>任务{statusLabelMap.completed}</span>
                <strong>{getStatusCount(tasksByStatus, "completed")}</strong>
              </div>
              <div className="studyhubDashboardStatusItem">
                <span>复习{statusLabelMap.pending}</span>
                <strong>{pendingReviewPlansCount}</strong>
              </div>
              <div className="studyhubDashboardStatusItem">
                <span>复习{statusLabelMap.completed}</span>
                <strong>{completedReviewPlansCount}</strong>
              </div>
            </div>
            <div className={`studyhubDashboardStatusHint ${completionStatus}`}>
              {completionRate >= 80
                ? "学习节奏稳定，建议保持复盘频率。"
                : completionRate >= 50
                  ? "进度稳步推进，可优先清理高优任务。"
                  : "当前完成率偏低，建议先聚焦待办任务清单。"}
            </div>
          </Card>

          <Card className="studyhubDashboardPanel studyhubDashboardFocusPanel" title="学习关注点">
            {courseFocusList.length ? (
              <div className="studyhubDashboardFocusList">
                {courseFocusList.map((item) => (
                  <div key={`${item.course}-focus`} className="studyhubDashboardFocusItem">
                    <div>
                      <p>{item.course}</p>
                      <span>{item.focusText}</span>
                    </div>
                    <strong>{item.tasksCount} 任务</strong>
                  </div>
                ))}
              </div>
            ) : (
              <Empty description="暂无学习关注点" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
