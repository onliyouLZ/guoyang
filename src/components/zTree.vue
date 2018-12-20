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
              view: {
                selectedMulti: false
              },
              data:{
                simpleData:{
                  enable: true,
                }
              },
              check:{
                enable: true,
                chkStyle: "radio",
                radioType: "level"
              },
              callback:{
                onCheck: this.zTreeOnCheck
              },
            },
            zNodes:[],
          }
        },
        props:{
          treeData:Array,
          treeID:Array
        },
        methods:{
          zTreeOnCheck(event, treeId, treeNode) {
            this.$emit('checkTree',treeNode)
          },

        },
        mounted(){
          $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes)
        },
        created() {
          setTimeout(()=>{
            let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            let nodes = treeObj.getCheckedNodes(true);
            this.$emit('checkTree',nodes[0])
          },1000)
        },
        watch:{
          treeData(){
            this.zNodes=this.treeData;
            $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes)
          },
          treeID(){
            this.zNodes=this.treeID;
            $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes)
          }
        }
    }
</script>

<style scoped>

</style>
<style>
  @import "../ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css";
</style>
