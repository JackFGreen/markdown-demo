# markdown plugins

- 通过 `remark-directive` 支持 `:::name` markdown 自定义语法
- 通过 remark plugin 将 mdast 转为 hast
- hast 被转为自定义 tag 的 html
- 通过 `rehype-react` 连接 html 和 react 组件

## 语法

https://github.com/remarkjs/remark-directive

### 容器指令：包含内容的块级指令

```
:::name[内容]{attr1="value" attr2="value"}
内容
:::
```

### 叶指令：不包含内容的块级指令

```
::name[内容]{attr1="value" attr2="value"}
```

### 文本指令：内联指令

```
:name[内容]{attr1="value" attr2="value"}
```
