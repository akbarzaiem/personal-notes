import React from "react";
import { Col, Row, Input, Button } from "antd";

const { TextArea } = Input;

class InputNotes extends React.Component {
  render() {
    return (
      <>
        <Row gutter={24} style={{ paddingBottom: 10 }}>
          <Col span={5}>Input Title : </Col>
          <Col span={14}>
            <Input
              width={50}
              maxLength={50}
              placeholder="Input title"
              value={this.props.inputTitle}
              onChange={(e) => this.props.onTitleChange(e.target.value)}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingBottom: 10 }}>
          <Col span={5}>Input Content : </Col>
          <Col span={14}>
            <TextArea
              rows={4}
              placeholder="Input Content"
              maxLength={500}
              value={this.props.inputContent}
              onChange={(e) => this.props.onContentChange(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col style={{ margin: "auto", width: 50 }}>
            <Button
              type="primary"
              onClick={this.props.onSave}
              disabled={
                this.props.inputTitle === "" || this.props.inputContent === ""
              }
            >
              Save
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default InputNotes;
