<template>
  <div id="wangeditor">
    <div id="editor" ref="editorElem"></div>
  </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
      name: "wang-editor",
      props:['catchData'],    //接收父组件的方法
      mounted(){
        this.$nextTick(()=>{
          let editor = new E(this.$refs.editorElem);
          editor.customConfig.onchange = (html) => {
            // this.editorContent = html;
            this.catchData(html)  //把这个html通过catchData的方法传入父组件
          };
          editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
          ];
          editor.create()
        })
      }
    }
</script>

<style scoped>

</style>
