<template>
    <div id="organization">
      <div id="electric_prod_chart" style="width: 100%;height: calc(100vh - 87px)" v-on-echart-resize></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
      name: "organization",
      methods:{
        init_chart(){
          let electric_prod_chart = echarts.init(document.getElementById('electric_prod_chart'));
          let option = {
            title: {
              text: '防汛指挥机构图'
            },
            tooltip: {
              show: false,
              trigger: 'item',
              formatter: "{b}: {c}"
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: {
                  show: true
                }
              }
            },
            calculable: false,
            series: [{
              name: '树图',
              type: 'tree',
              orient: 'vertical', // vertical horizontal
              rootLocation: {
                x: '50%',
                y: '90%'
              }, // 根节点位置  {x: 'center',y: 10}
              nodePadding: 80,
              layerPadding: 140,
              symbol: 'rectangle',
              borderColor: 'black',
              initialTreeDepth:-1,
              itemStyle: {
                normal: {
                  color: '#fff', //节点背景色
                  label: {
                    show: true,
                    position: 'inside',
                    textStyle: {
                      color: 'black',
                      fontSize: 15,
                      //fontWeight:  'bolder'
                    }
                  },
                  lineStyle: {
                    color: '#000',
                    width: 1,
                    type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                  }
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              },
              data: [{
                name: '董事会',
                value: 6,
                symbolSize: [70, 30],
                symbol: 'rectangle',
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    borderColor: 'black'
                  }
                },
                children: [{
                  name: '总经理',
                  value: 6,
                  symbolSize: [70, 30],
                  symbol: 'rectangle',
                  itemStyle: {
                    normal: {
                      borderWidth: 2,
                      borderColor: 'black'
                    }
                  },
                  children: [
                    {
                    name: '营销中心',
                    value: 4,
                    symbolSize: [70, 30],
                    symbol: 'rectangle',
                    itemStyle: {
                      normal: {
                        label: {
                          show: true,
                          position: 'inside'
                        },
                        borderWidth: 2,
                        borderColor: 'black'
                      }
                    },
                    children: [{
                      name: '市场部',
                      value: 4,
                      symbolSize: [60, 30],
                      symbol: 'rectangle',
                      itemStyle: {
                        normal: {
                          label: {
                            show: true,
                            position: 'inside'
                          },
                          borderWidth: 2,
                          borderColor: 'black'
                        }
                      },
                    },
                      {
                        name: '销售部',
                        value: 4,
                        symbolSize: [60, 30],
                        symbol: 'rectangle',
                        itemStyle: {
                          normal: {
                            label: {
                              show: true,
                              position: 'inside'
                            },
                            borderWidth: 2,
                            borderColor: 'black'
                          }
                        },
                      },
                      {
                        name: '客服部',
                        value: 4,
                        symbolSize: [60, 30],
                        symbol: 'rectangle',
                        itemStyle: {
                          normal: {
                            label: {
                              show: true,
                              position: 'inside'
                            },
                            borderWidth: 2,
                            borderColor: 'black'
                          }
                        },
                      }
                    ]
                  },
                    {
                      name: '项目中心',
                      value: 4,
                      symbolSize: [70, 30],
                      symbol: 'rectangle',
                      itemStyle: {
                        normal: {
                          label: {
                            show: true,
                            position: 'inside'
                          },
                          borderWidth: 2,
                          borderColor: 'black'
                        }
                      },
                      children: [{
                        name: '售前支持部',
                        value: 4,
                        symbolSize: [90, 30],
                        symbol: 'rectangle',
                        itemStyle: {
                          normal: {
                            label: {
                              show: true,
                              position: 'inside'
                            },
                            borderWidth: 2,
                            borderColor: 'black'
                          }
                        },
                      },
                        {
                          name: '项目一部',
                          value: 4,
                          symbolSize: [70, 30],
                          symbol: 'rectangle',
                          itemStyle: {
                            normal: {
                              label: {
                                show: true,
                                position: 'inside'
                              },
                              borderWidth: 2,
                              borderColor: 'black'
                            }
                          },
                        },
                        {
                          name: '项目二部',
                          value: 4,
                          symbolSize: [70, 30],
                          symbol: 'rectangle',
                          itemStyle: {
                            normal: {
                              label: {
                                show: true,
                                position: 'inside'
                              },
                              borderWidth: 2,
                              borderColor: 'black'
                            }
                          },
                        },
                        {
                          name: '项目三部',
                          value: 4,
                          symbolSize: [70, 30],
                          symbol: 'rectangle',
                          itemStyle: {
                            normal: {
                              label: {
                                show: true,
                                position: 'inside'
                              },
                              borderWidth: 2,
                              borderColor: 'black'
                            }
                          },
                        }
                      ]
                    },
                    {
                      name: '技术中心',
                      value: 4,
                      symbolSize: [70, 30],
                      symbol: 'rectangle',
                      itemStyle: {
                        normal: {
                          label: {
                            show: true,
                            position: 'inside'
                          },
                          borderWidth: 2,
                          borderColor: 'black'
                        }
                      },
                      children: [{
                        name: '开发部',
                        value: 4,
                        symbolSize: [70, 30],
                        symbol: 'rectangle',
                        itemStyle: {
                          normal: {
                            label: {
                              show: true,
                              position: 'inside'
                            },
                            borderWidth: 2,
                            borderColor: 'black'
                          }
                        },
                      },
                        {
                          name: '设计部',
                          value: 4,
                          symbolSize: [70, 30],
                          symbol: 'rectangle',
                          itemStyle: {
                            normal: {
                              label: {
                                show: true,
                                position: 'inside'
                              },
                              borderWidth: 2,
                              borderColor: 'black'
                            }
                          },
                        },
                        {
                          name: '系统部',
                          value: 4,
                          symbolSize: [70, 30],
                          symbol: 'rectangle',
                          itemStyle: {
                            normal: {
                              label: {
                                show: true,
                                position: 'inside'
                              },
                              borderWidth: 2,
                              borderColor: 'black'
                            }
                          },
                        }
                      ]
                    },
                    {
                      name: '行政部',
                      value: 4,
                      symbolSize: [70, 30],
                      symbol: 'rectangle',
                      itemStyle: {
                        normal: {
                          label: {
                            show: true,
                            position: 'inside'
                          },
                          borderWidth: 2,
                          borderColor: 'black'
                        }
                      }
                    },
                    {
                      name: '财务部',
                      value: 4,
                      symbolSize: [70, 30],
                      symbol: 'rectangle',
                      itemStyle: {
                        normal: {
                          label: {
                            show: true,
                            position: 'inside'
                          },
                          borderWidth: 2,
                          borderColor: 'black'
                        }
                      }
                    },
                    {
                      name: '其他分支',
                      value: 4,
                      symbolSize: [70, 30],
                      symbol: 'rectangle',
                      itemStyle: {
                        normal: {
                          label: {
                            show: true,
                            position: 'inside'
                          },
                          borderWidth: 2,
                          borderColor: 'black'
                        }
                      },
                      children: [{
                        name: '汕头分公司',
                        value: 4,
                        symbolSize: [90, 30],
                        symbol: 'rectangle',
                        itemStyle: {
                          normal: {
                            label: {
                              show: true,
                              position: 'inside'
                            },
                            borderWidth: 2,
                            borderColor: 'black'
                          }
                        },
                      }]
                    },
                  ]
                }]
              }]
            }],

          };
          electric_prod_chart.setOption(option);
        }
      },
      mounted() {
        this.$nextTick(()=>{
          this.init_chart()
        })
      }
  }
</script>

<style scoped>

</style>
