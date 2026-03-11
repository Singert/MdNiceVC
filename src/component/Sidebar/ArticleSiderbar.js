import React from "react";
import { Layout, Menu, Button } from "antd";
import { FolderAddOutlined, FileAddOutlined } from "@ant-design/icons";
import "./ArticleSidebar.css"; // 可以用于自定义样式

const { Sider } = Layout;

export default function ArticleSidebar({ onNewArticle, folders }) {
  return (
    <Sider width={240} theme="light" className="article-sidebar">
      <div style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          block
          onClick={onNewArticle}
        >
          新建文章
        </Button>
        {/* 未来可加：新建文件夹按钮 */}
      </div>

      <Menu mode="inline" defaultOpenKeys={["default"]}>
        {folders.map((folder) => (
          <Menu.ItemGroup key={folder.name} title={folder.name}>
            {folder.articles.map((article) => (
              <Menu.Item
                key={article.DocumentID}
                onClick={() => folder.onSelect(article)}
              >
                {article.DocumentID}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        ))}
      </Menu>
    </Sider>
  );
}
