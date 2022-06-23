<template>
    <div class="navbar-class">
        <!-- <div @click="routerPath(home[0].path, home[0].children[0].path)">
            首页
        </div> -->
     
        <!-- <div   v-for="(item, index) in routers"
            :key="index">
           {{item.meta.title}}
        </div> -->
        <el-popover
            popper-class="popper-menu-class"
            placement="bottom-start"
            trigger="hover"
            v-for="(item, index) in routers"
            :key="index"
        >
            <div slot="reference" v-if="titles(item.meta)" disabled class="navli">
                {{ titles(item.meta) }}
            </div>
            <div solt="center" v-if="titles(item.meta)" >
                <div
                    v-for="(item1, index1) in item.children"
                    :key="index1"
                    class="level2-class"
                >
                    <svg-icon :icon-class="item1.meta.icon"></svg-icon>
                    {{ titles(item1.meta) }}
                </div>
            </div>
        </el-popover>

        <!-- <div class="level1-class" v-for="(item, index) in dataList" :key="index">
      <svg-icon icon-class="password"></svg-icon>
      {{ item.text }}
       <div v-for="(item,index1) in item.children" :key="index1">

      </div> 
    </div> -->
    </div>
</template>

<script>
import list from "./list";
export default {
    data() {
        return {
            dataList: [
                {
                    icon: "",
                    meta: {
                        text: "物联设施",
                    },
                    path: "",
                    level: 1,
                    children: [
                        {
                            icon: "",
                            text: "",
                            path: "",
                        },
                    ],
                },
                {
                    icon: "",
                    meta: {
                        text: "维保管理",
                    },
                    path: "",
                    level: 1,
                    children: [
                        {
                            icon: "",
                            text: "",
                            path: "",
                        },
                    ],
                },
                {
                    icon: "",
                    meta: {
                        text: "基础数据",
                    },
                    path: "",
                    level: 1,
                    children: [
                        {
                            icon: "",
                            text: "",
                            path: "",
                        },
                    ],
                },
                {
                    icon: "",
                    meta: {
                        text: "单位管理",
                    },
                    path: "",
                    level: 1,
                    children: [
                        {
                            icon: "",
                            text: "",
                            path: "",
                        },
                    ],
                },
                {
                    icon: "",
                    meta: {
                        text: "用户管理",
                    },
                    path: "",
                    level: 1,
                    children: [
                        {
                            icon: "",
                            text: "",
                            path: "",
                        },
                    ],
                },
                {
                    icon: "",
                    meta: {
                        text: "信息平台",
                    },
                    path: "",
                    level: 1,
                    children: [
                        {
                            icon: "",
                            text: "",
                            path: "",
                        },
                    ],
                },
                {
                    icon: "",
                    meta: {
                        text: "消防督查",
                    },
                    path: "",
                    level: 1,
                    children: [
                        {
                            icon: "",
                            text: "",
                            path: "",
                        },
                    ],
                },
                {
                    icon: "",
                    meta: {
                        text: "网格管理",
                    },
                    path: "",
                    level: 1,
                    children: [
                        {
                            icon: "",
                            text: "",
                            path: "",
                        },
                    ],
                },
            ],
            routes: [],
            home: [],
            hose: {
                a: {
                    title: "1",
                },
            },
            paths: "",
        };
    },
    computed: {
        // routers() {
        //   return this.$route.path;
        // },
    },
    created() {
        // this.routes = JSON.parse(JSON.stringify(this.$store.state.routersave.rightList));
        // this.home = this.routes.splice(0, 1);

        this.routers = list;
        console.log(this.routers);
        // let pa = {
        //   pathpar: this.home[0].path,
        //   pathchild: this.home[0].children[0].path,
        // };
        // sessionStorage.setItem("paths", JSON.stringify(pa));
        // this.paths = sessionStorage.getItem("paths");
    },
    mounted() {
        this.routers = list;
        console.log(this.routers);
    },
    methods: {
        titles(meta) {
            if (meta === undefined) {
                return false;
            }
            return meta.title;
        },
        // 路劲跳转使用
        // routerPath(path, path1) {
        //   // 将点击的路由存到sessionStorage
        //   paths = {
        //     pathpar: path,
        //     pathchild: path1,
        //   };
        //   sessionStorage.setItem("paths", JSON.stringify(paths));

        //   let paths = path + "/" + path1;
        //   if (this.routers != paths) {
        //     this.$router.push({ path: paths });
        //   }
        // },
        // 控制样式显示使用
        // homeClassMethod(path, flag = 1, roleId) {

        //   if (roleId) {
        //     let paList = this.routers.split("/");
        //     if (flag == 1) {
        //       if (path == "/" + paList[1]) {
        //         return "level1-class level1-active-class";
        //       } else {
        //         return "level1-class";
        //       }
        //     } else {
        //       if (path == paList[2]) {
        //         return "level2-class level2-active-class";
        //       } else {
        //         return "level2-class";
        //       }
        //     }
        //   } else {
        //     if (flag == 1) {
        //       return "level1-class-drop";
        //     } else {
        //       return "level2-class-drop";
        //     }
        //   }
        // },
    },
};
</script>

<style scoped lang="scss">
.navli{
      border: 2px solid #4394e478;
    border-radius: 0.13333rem;
    display: inline-block;
    width: 7.5%;
    height: 0.65333rem;
    line-height: 0.6rem;
    text-align: center;
    margin: 0 0.5%;
    font-size: 0.25rem;
    cursor: pointer;
}
.navbar-class {
    // border: 1px solid yellow;
    // height: 0.8rem;
    width: 100%;
    margin-top: 0.21333rem;
    margin-bottom: 0.26667rem;
    text-align: center;
    .level1-class {
        border: 2px solid #4394e478;
        border-radius: 0.13333rem;
        display: inline-block;
        width: 7.5%;
        height: 0.65333rem;
        line-height: 0.6rem;
        text-align: center;
        margin: 0 0.5%;
        font-size: 0.25rem;
        cursor: pointer;
    }
    .level1-class-drop {
        border: 2px solid #00950578;
        border-radius: 0.13333rem;
        display: inline-block;
        width: 7.5%;
        height: 0.65333rem;
        line-height: 0.6rem;
        text-align: center;
        margin: 0 0.5%;
        font-size: 0.25rem;
        cursor: no-drop;
        color: #00950578;
    }

    .level1-class:hover {
        border-color: #0080ff;
        box-shadow: 2px 2px 5px 0px #0080ff;
    }
    .level1-active-class {
        border-color: #0080ff;
        box-shadow: 2px 2px 5px 0px #0080ff;
    }
}
.level2-class {
    border: 1px solid #4394e478;
    text-align: center;
    padding: 0.05333rem;
    font-size: 0.22rem;
    cursor: pointer;
    margin: 0.13333rem 0;
    border-radius: 0.08rem;
}
.level2-class:hover {
    border-color: #0080ff;
    box-shadow: 1px 1px 3px 0px #0080ff;
}
.level2-active-class {
    border-color: #0080ff;
    color: #0080ff;
    box-shadow: 1px 1px 3px 0px #0080ff;
}

.level2-class-drop {
    border: 1px solid #00950578;
    text-align: center;
    padding: 0.05333rem;
    font-size: 0.22rem;
    cursor: no-drop;
    margin: 0.13333rem 0;
    border-radius: 0.08rem;
    color: #00950578;
}
</style>
