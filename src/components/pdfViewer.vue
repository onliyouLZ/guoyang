<template>
    <div class="pdfContainer">
        <canvas class="canvas" ref="theCanvas" id="the-canvas"></canvas>
    </div>
</template>
<script>
    // import PDF from '../utils/build/pdf'
    export default {
        name:'pdf',
        props:['pdfurl'],
        data(){
            return {
                pdfDoc:null,
                pageNum:1,
                pageRendering:false,
                pageNumPending:null,
                scale:1.2,//放大倍数
                page_num:0,//当前页数
                page_count:0,//总页数
                maxscale:2,//最大放大倍数
                minscale:0.8//最小放大倍数
            }
        },
        methods:{
            renderPage(num){
                let that=this;
                this.pageRendering=true;
                let canvas=document.getElementById('the-canvas');
                this.pdfDoc.getPage(num).then((page)=>{
                    var viewport=page.getViewport(that.scale);
                    canvas.height=viewport.height;
                    canvas.width=viewport.width;

                    var renderContext={
                        canvasContext:that.ctx,
                        viewport:viewport
                    };
                    var renderTask=page.render(renderContext);
                    renderTask.promise.then(()=>{
                        that.pageRendering=false;
                        if(that.pageNumPending!==null){
                            that.renderPage(that.pageNumPending);
                            that.pageNumPending=null;
                        }
                    })
                });
                that.page_num=that.pageNum;
            },
            getPdf(){
                let url='/static/img/srcpfd.pdf';
                let pdfjsLib=PDF;
                pdfjsLib.PDFJS.workerSrc='/static/pdf/build/pdf.worker.js';
                let loadingTask=pdfjsLib.getDocument(url);
                loadingTask.promise.then((pdf)=>{
                    let pageNumber=1;
                    this.getPage(pageNumber)
                })
            },
            addscale(){//放大
                if(this.scale>=this.maxscale){
                    return
                }
                this.scale+=0.1;
                this.queueRenderPage(this.pageNum)
            },
            minus(){//缩小
                if(this.scale<=this.minscale){
                    return
                }
                this.scale-=0.1;
                this.queueRenderPage(this.pageNum);
            },
            prev(){//上一页
                let vm=this;
                if(vm.pageNum<=1){
                    return
                }
                vm.pageNum--;
                vm.queueRenderPage(vm.pageNum)
            },
            next(){//下一页
                let vm=this;
                if(vm.pageNum>=vm.page_count){
                    return;
                }
                vm.pageNum++;
                vm.queueRenderPage(vm.pageNum);
            },
            queueRenderPage(num){
                if(this.pageRendering){
                    this.pageNumPending=num;
                }else{
                    this.renderPage(num);
                }
            },

        },
        computed:{
            ctx(){
                let id=document.getElementById('the-canvas');
                return id.getContext('2d');
            }
        },
        mounted(){
            let vm=this;
          vm.pdfDoc=vm.pdfurl;
          // vm.page_count=vm.pdfDoc.numPages;
          // vm.renderPage(vm.pageNum)
            // PDF.getDocument(vm.pdfurl).then(function(pdfDoc_){//初始化PDF
            //     vm.pdfDoc=pdfDoc_;
            //     vm.page_count=vm.pdfDoc.numPages;
            //     vm.renderPage(vm.pageNum)
            // })
        }
    }
</script>
