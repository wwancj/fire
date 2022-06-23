let list=[
    {
        "path": "/Monitor",
        "component": "Layout",
        "level": 1,
        "children": [
            {
                "path": "DataMonitor",
                "component": "Monitor-DataMonitor",
                "level": 2,
                "roleId": true,
                "meta": {
                    "view": true,
                    "icon": "RealTimeMonitoring",
                    "remove-outline": true,
                    "title": "首页"
                },
                "id": 110
            }
        ],
        "roleId": true,
        "meta": {
            "icon": "Monitor",
            "title": "首页"
        },
        "id": 100
    },
    {
        "path": "/EquipMent",
        "component": "Layout",
        "level": 1,
        "children": [
            {
                "path": "EquipManage",
                "component": "EquipMent-EquipManage",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "equipManagement",
                    "remove-outline": true,
                    "title": "设备管理",
                    "delete": true
                },
                "id": 210
            },
            {
                "path": "EquipData",
                "component": "EquipMent-EquipData",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "RealData",
                    "title": "数据日志",
                    "delete": true
                },
                "id": 220
            },
            {
                "path": "EquipReport",
                "component": "EquipMent-EquipReport",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "excel",
                    "title": "运行报表",
                    "delete": true
                },
                "id": 240
            }
        ],
        "roleId": true,
        "meta": {
            "icon": "EquipMent",
            "title": "物联设施"
        },
        "id": 200
    },
    {
        "path": "/Maintenance",
        "component": "Layout",
        "level": 1,
        "children": [
            {
                "path": "MainContract",
                "component": "Maintenance-MainContract",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "contract",
                    "title": "维保合同",
                    "delete": true
                },
                "id": 310
            },
            {
                "path": "MainRecord",
                "component": "Maintenance-MainRecord",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "MaintenanceLog",
                    "title": "维保记录",
                    "delete": true
                },
                "id": 320
            },
            {
                "path": "MaintainRecord",
                "component": "Maintenance-MaintainRecord",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "MaintenanceLog",
                    "title": "维修记录",
                    "delete": true
                },
                "id": 325
            },
            {
                "path": "Appointment",
                "component": "Maintenance-Appointment",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "Call-Reservation",
                    "title": "维保预约",
                    "delete": true
                },
                "id": 330
            }
        ],
        "roleId": true,
        "meta": {
            "icon": "MainContract",
            "title": "维保管理"
        },
        "id": 300
    },
    {
        "path": "/CustomerInfo",
        "component": "Layout",
        "level": 1,
        "children": [
            {
                "path": "UnitMainInfo",
                "component": "CustomerInfo-UnitMainInfo",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "info",
                    "title": "单位信息",
                    "delete": true
                },
                "id": 510
            },
            {
                "path": "FireRecord",
                "component": "CustomerInfo-FireRecord",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "file",
                    "title": "消防档案",
                    "delete": true
                },
                "id": 520
            }
        ],
        "roleId": true,
        "meta": {
            "icon": "UnitManagement",
            "title": "单位管理"
        },
        "id": 500
    },
    {
        "path": "/Information",
        "component": "Layout",
        "level": 1,
        "children": [
            {
                "path": "Journalism",
                "component": "Information-Journalism",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "news",
                    "title": "新闻动态",
                    "delete": true
                },
                "id": 710
            },
            {
                "path": "Regulations",
                "component": "Information-Regulations",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "legal",
                    "title": "制度法规",
                    "delete": true
                },
                "id": 720
            },
            {
                "path": "SysNotice",
                "component": "Information-SysNotice",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "news",
                    "title": "平台公告",
                    "delete": true
                },
                "id": 730
            },
            {
                "path": "OperationTraining",
                "component": "Information-OperationTraining",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "news",
                    "title": "操作培训",
                    "delete": true
                },
                "id": 740
            }
        ],
        "roleId": true,
        "meta": {
            "icon": "Information",
            "title": "信息平台"
        },
        "id": 700
    },
    {
        "path": "/BasicInfo",
        "component": "Layout",
        "level": 1,
        "children": [
            {
                "path": "AdminArea",
                "component": "BasicInfo-AdminArea",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "administration",
                    "title": "行政区域",
                    "delete": true
                },
                "id": 410
            },
            {
                "path": "SysResources",
                "component": "BasicInfo-SysResources",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "Resources",
                    "title": "系统资源",
                    "delete": true
                },
                "id": 420
            },
            {
                "path": "House",
                "component": "BasicInfo-House",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "house",
                    "title": "建筑管理",
                    "delete": true
                },
                "id": 430
            },
            {
                "path": "Headwaters",
                "component": "BasicInfo-Headwaters",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "water",
                    "title": "水源管理",
                    "delete": true
                },
                "id": 440
            },
            {
                "path": "Subsystem",
                "component": "BasicInfo-Subsystem",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "system",
                    "title": "子系统设置",
                    "delete": true
                },
                "id": 450
            },
            {
                "path": "ProductManage",
                "component": "BasicInfo-ProductManage",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "product",
                    "title": "产品管理",
                    "delete": true
                },
                "id": 460
            }
        ],
        "roleId": true,
        "meta": {
            "icon": "BasicInfo",
            "title": "基础数据"
        },
        "id": 400
    },
    {
        "path": "/UserManage",
        "component": "Layout",
        "level": 1,
        "children": [
            {
                "path": "Account",
                "component": "UserManage-Account",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "User-Settings",
                    "title": "账号管理",
                    "delete": true
                },
                "id": 610
            },
            {
                "path": "Role",
                "component": "UserManage-Role",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "role",
                    "title": "角色管理",
                    "delete": true
                },
                "id": 620
            }
        ],
        "roleId": true,
        "meta": {
            "icon": "UserManage",
            "title": "用户管理"
        },
        "id": 600
    },
    {
        "path": "/FireInspector",
        "component": "Layout",
        "level": 1,
        "children": [
            {
                "path": "ExamineTask",
                "component": "FireInspector-ExamineTask",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "task",
                    "title": "检查任务",
                    "delete": true
                },
                "id": 810
            },
            {
                "path": "ExamineRecord",
                "component": "FireInspector-ExamineRecord",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "Check",
                    "title": "检查记录",
                    "delete": true
                },
                "id": 820
            },
            {
                "path": "Instruct",
                "component": "FireInspector-Instruct",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "Penalty",
                    "title": "责令改正",
                    "delete": true
                },
                "id": 830
            },
            {
                "path": "HiddenPictures",
                "component": "FireInspector-HiddenPictures",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "warning",
                    "title": "隐患照片",
                    "delete": true
                },
                "id": 840
            }
        ],
        "roleId": true,
        "meta": {
            "icon": "FireInspector",
            "title": "消防督查"
        },
        "id": 800
    },
    {
        "path": "/Meshing",
        "component": "Layout",
        "level": 1,
        "children": [
            {
                "path": "FireMeshing",
                "component": "Meshing-FireMeshing",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "area",
                    "title": "消防网格",
                    "delete": true
                },
                "id": 910
            },
            {
                "path": "SysMeshing",
                "component": "Meshing-SysMeshing",
                "level": 2,
                "roleId": true,
                "meta": {
                    "add": true,
                    "view": true,
                    "edit": true,
                    "icon": "platform",
                    "title": "平台网格",
                    "delete": true
                },
                "id": 920
            },
            {
                "path": "VR3D",
                "component": "Meshing-VR3D",
                "level": 2,
                "roleId": true,
                "meta": {
                    "view": true,
                    "icon": "platform",
                    "title": "VR3D展示"
                },
                "id": 930
            }
        ],
        "roleId": true,
        "meta": {
            "icon": "GridManagement",
            "title": "网格管理"
        },
        "id": 900
    }
]

export default list