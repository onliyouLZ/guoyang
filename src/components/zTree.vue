<template>
    <div id="zTree">
      <div>
        <ul id="treeDemo" class="ztree"></ul>
      </div>
    </div>
</template>

<script>

    export default {
        name: "zTree",
        data(){
          return{
            setting:{
              data:{
                simpleData:{
                  enable: true,
                }
              },
              check:{
                enable: true,
                chkStyle: "radio",
                radioType: "level"
              }
            },
            zNodes:[
              { id:1, pId:0, name:"雨量站", open:true},
              { id:11, pId:1, name:"金水闸"},
              { id:12, pId:1, name:"法泗闸"},
              { id:13, pId:1, name:"鲁湖闸"},
            ]
          }
        },
      methods:{
      },
      mounted(){
        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
      }
    }
</script>

<style scoped>

</style>
<style>
  @import "../ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css";
</style>
