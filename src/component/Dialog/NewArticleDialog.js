import React, { Component } from "react";
import { Modal, Input, message } from "antd";
import { observer, inject } from "mobx-react";
import { setLocalDocuments } from "../LocalHistory/util";

@inject("dialog")
@inject("content")
@observer
class NewArticleDialog extends Component {
  state = {
    title: "",
  };

  handleOk = async () => {
    const { title } = this.state;
    if (!title.trim()) {
      message.warning("请输入标题");
      return;
    }

    const newDoc = {
      Content: "",
      DocumentID: title,
      SaveTime: new Date(),
    };

    const db = window.localDB;
    if (!db) {
      message.error("数据库未初始化");
      return;
    }

    await setLocalDocuments(db, [], newDoc);
    this.props.dialog.setNewArticleOpen(false);
    message.success("新文章创建成功！");
    this.setState({ title: "" });

    // 更新当前编辑器内容
    this.props.content.setContent("");
  };

  handleCancel = () => {
    this.props.dialog.setNewArticleOpen(false);
    this.setState({ title: "" });
  };

  render() {
    return (
      <Modal
        title="新建文章"
        okText="创建"
        cancelText="取消"
        visible={this.props.dialog.isNewArticleOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Input
          placeholder="请输入文章标题"
          value={this.state.title}
          onChange={(e) => this.setState({ title: e.target.value })}
        />
      </Modal>
    );
  }
}

export default NewArticleDialog;
