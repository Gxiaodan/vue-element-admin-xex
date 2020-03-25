<template>
    <div>
       11111111111111
           <grid-layout
                    :layout.sync="layout"
                    :col-num="12"
                    :row-height="30"
                    :is-draggable="true"
                    :is-resizable="true"
                    :is-mirrored="false"
                    :vertical-compact="true"
                    :margin="[10, 10]"
                    :use-css-transforms="true"
            >

                <grid-item v-for="item in layout"
                style="border:2px solid #999;"
                        :x="item.x"
                        :y="item.y"
                        :w="item.w"
                        :h="item.h"
                        :i="item.i"
                        :key="item.i"
                           @resized="resized"
                        >
                    {{item.i}}
    <chart @editAction="editAction" v-if="item.i=='0'" :height="cHeight" :width="cWidth" />
                  </grid-item>
            </grid-layout>

            <p>vue-json-editor</p>
            <vue-json-editor 
              v-model="json" 
              :show-btns="true" 
              :expandedOnStart="false" 
              :lang="'en'"
              @json-change="onJsonChange"
              @json-save="onJsonSave" 
              @has-error="onError"
              ></vue-json-editor>

            <el-drawer
              title="我是标题"
              :visible.sync="drawer"
              :direction="direction"
              :before-close="handleClose">
              <span>我来啦!</span>
            </el-drawer>
    </div>
</template>
<script>
import Chart from '@/components/Charts/LineMarker'
import vueJsonEditor from 'vue-json-editor'
    export default {
        name: "vue_grid_layout",
        components: {
          Chart,
          vueJsonEditor
        },
        data() {
            return {
              json: {
                msg: 'demo of jsoneditor',
                arr: [
                  1,2,3,4,5
                ],
                obj:{
                  name:'ddd',
                  age: 12
                }
              },
              drawer: false,
              direction: 'rtl',
              cHeight: '200px',
              cWidth: '200px',
                options: {
                    title: '最近七天每天的用户访问量',
                    // showValue: false,
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                data: [{
                        name: '2018/09/04',
                        value: 1083
                    },
                    {
                        name: '2018/09/05',
                        value: 941
                    },
                    {
                        name: '2018/09/06',
                        value: 1139
                    },
                    {
                        name: '2018/09/07',
                        value: 816
                    },
                    {
                        name: '2018/09/08',
                        value: 327
                    },
                    {
                        name: '2018/09/09',
                        value: 228
                    },
                    {
                        name: '2018/09/10',
                        value: 1065
                    }
                ],
                layout: [
                    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
                    {"x":2,"y":0,"w":2,"h":4,"i":"1"},
                    {"x":4,"y":0,"w":2,"h":5,"i":"2"},
                    {"x":6,"y":0,"w":2,"h":3,"i":"3"},
                    {"x":8,"y":0,"w":2,"h":3,"i":"4"}
                ]
            }
        },
        methods: {
          onJsonChange (value) {
            console.log('value:', value)
          },onJsonSave (value) {
                console.log('value:', value);
            },

            onError (value) {
                console.log('value:', value);
            },
            resized: function(i, newH, newW, newHPx, newWPx){
              this.cHeight = newHPx - 80 + 'px';
              this.cWidth = newWPx + 'px';
                console.log("### RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
            },
             handleClose(done) {
                this.$confirm('确认关闭？')
                  .then(_ => {
                    done();
                  })
                  .catch(_ => {});
              },
              editAction(){
                this.drawer = true;
              }

        },
        model: {

        },
        props: {

        },
        mounted(){
         
        }

    }
</script>


<style scoped >
</style>