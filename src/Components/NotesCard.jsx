import React from "react";
import { Card, Space, Divider, Button } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { showFormattedDate } from "../Utils/index";

class NotesCard extends React.Component {
  render() {
    return (
      <>
        <Row gutter={[24, 24]} style={{ paddingTop: 25 }}>
          <Col span={8}>
            <Card
              title={
                <>
                  <Divider style={{ fontSize: 18 }}>
                    {this.props.inputTitle}
                  </Divider>
                  <Divider style={{ fontSize: 12, color: "grey" }}>
                    {`created on ${showFormattedDate(
                      this.props.inputCreatedAt
                    )}`}
                  </Divider>
                </>
              }
              bordered={false}
              style={{
                width: 300,
              }}
            >
              <div style={{ maxHeight: "100px", overflowY: "auto" }}>
                {this.props.inputContent}
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{ maxWidth: 310, paddingBottom: 25 }}>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Space>
              {!this.props.archived && (
                <Button
                  type=""
                  icon={<SaveOutlined />}
                  onClick={() => this.props.onArchive(this.props.id)}
                >
                  Archive
                </Button>
              )}
            </Space>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Space>
              <Button
                type=""
                icon={<DeleteOutlined />}
                onClick={() => this.props.onDelete(this.props.id)}
              >
                Delete
              </Button>
            </Space>
          </Col>
        </Row>
      </>
    );
  }
}

export default NotesCard;
