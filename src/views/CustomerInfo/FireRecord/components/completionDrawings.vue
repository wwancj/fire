<!--竣工图纸部分-->
<template>
  <div>
    <el-row>
      <el-card shadow="never" class="row-input-parallel card-10px table-auto">
        <el-select
          v-model="page.id"
          v-permission
          filterable
          clearable
          placeholder="请选择单位"
          size="mini"
          :disabled="unitOptionsDisabled"
        >
          <el-option
            v-for="item in $unitOptions"
            :key="item.customerUnitId"
            :label="item.unitName"
            :value="item.customerUnitId"
          />
        </el-select>
        <!-- <el-input
          v-model="page.desc"
          size="mini"
          placeholder="根据备注搜索"
          class="input-with-select"
          clearable
        /> -->
        <el-button
          v-permission
          type="success"
          size="mini"
          icon="el-icon-search"
          @click="funSelectAllBlueprint"
        >搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-refresh-left" @click="reset">重置</el-button>
        <el-button
          v-has="{action: 'add'}"
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="insertDialogVisible=true"
        >新增</el-button>
      </el-card>
    </el-row>

    <el-card shadow="never" class="card-img-list card-10px">
      <el-row :gutter="20" class="img-el-row-size">
        <el-col v-for="(item,index) in blueprintList" :key="index" :span="8" class="card-img">
          <div>
            <el-card shadow="never" class="img-card">
              <div class="remark-info">
                <span show-overflow-tooltip>描述：{{ item.remark }}</span>
                <i
                  v-has="{action: 'edit', effect: 'disabled'}"
                  class="el-icon-edit update-info"
                  @click="updateBlueprint(item)"
                />
                <i
                  v-has="{action: 'delete', effect: 'disabled'}"
                  class="el-icon-delete delete-dangers"
                />
              </div>
              <viewer>
                <el-image :src="item.blueprintUrl" class="img-info" lazy />
              </viewer>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog class="huise-class" width="600px" title="添加图片" :visible.sync="insertDialogVisible" :modal-append-to-body="false">
      <el-form
        ref="insertForm"
        label-width="100px"
        class="from-format100"
        :inline="true"
        size="small"
        :model="insertForm"
        :rules="rules"
      >
        <el-form-item label="单位" prop="customerUnitId">
          <el-select
            id="unitSelectTag"
            v-model="insertForm.customerUnitId"
            filterable
            clearable
            placeholder="请选择单位"
            size="mini"
            :disabled="unitOptionsDisabled"
          >
            <el-option
              v-for="item in $unitOptions"
              :key="item.customerUnitId"
              :label="item.unitName"
              :value="item.customerUnitId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="添加描述" prop="remark">
          <el-input v-model="insertForm.remark" maxlength="200" type="textarea" />
        </el-form-item>

        <el-form-item label="上传图片" prop="blueprintUrl">
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="$picturePrefixURL"
            :limit="1"
            :file-list="fileList"
            :on-remove="handleRemove"
            :on-success="handleUpSuccess"
            :before-upload="(file) => $beforeUpload(file)"
            :on-error="(err, file, fileList) => $onError(err, file, fileList)"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('insertForm')">取 消</el-button>
        <el-button type="primary" @click="addConfirm('insertForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog class="huise-class" width="600px" title="编辑图片" :visible.sync="updateDialogVisible" :modal-append-to-body="false">
      <el-form
        ref="updateForm"
        label-width="100px"
        class="from-format100"
        :inline="true"
        size="small"
        :model="updateForm"
        :rules="rules"
      >
        <el-form-item label="单位" prop="customerUnitId">
          <el-select
            v-model="updateForm.customerUnitId"
            filterable
            clearable
            placeholder="请选择单位"
            size="mini"
            :disabled="unitOptionsDisabled"
          >
            <el-option
              v-for="item in $unitOptions"
              :key="item.customerUnitId"
              :label="item.unitName"
              :value="item.customerUnitId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="添加描述">
          <el-input v-model="updateForm.remark" maxlength="200" type="textarea" />
        </el-form-item>

        <el-form-item label="上传图片" prop="blueprintUrl">
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="$picturePrefixURL"
            :limit="1"
            :file-list="fileList"
            :on-remove="handleRemove"
            :on-success="handleUpSuccessEdit"
            :before-upload="(file) => $beforeUpload(file)"
            :on-error="(err, file, fileList) => $onError(err, file, fileList)"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('updateForm')">取 消</el-button>
        <el-button type="primary" @click="updateConfirm('updateForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { verifyUserPermission } from '@/utils/validate'
import {
  selectAllBlueprint,
  insertBlueprint,
  updateBlueprintByPrimaryKey,
  deleteBlueprintByPrimaryKey
} from '@/api/customer/Blueprint'
export default {
  data() {
    var checkBlueprint = (rule, value, callback) => {
      if (!value) return callback(new Error('必须上传图片'))
      else callback()
    }
    return {
      rules: {
        blueprintUrl: [
          {
            validator: checkBlueprint,
            trigger: 'blur'
          }
        ],
        customerUnitId: [
          {
            required: true,
            message: '必须填写'
          }
        ]
      },
      updateForm: [],
      updateDialogVisible: false,
      unitOptionsDisabled: false,
      page: {
        id: null,
        desc: ''
      },
      fileList: [],
      insertForm: {
        remark: '',
        blueprintUrl: '',
        customerUnitId: '',
        blueprintId: ''
      },
      insertDialogVisible: false,
      selectUserInfo: '',
      blueprintList: [
        {
          remark: '图纸1',
          src: require('@/assets/13f98ew1f0ew3f156.png')
        },
        {
          remark: '图纸2',
          src: require('@/assets/timg.jpg')
        },
        {
          remark: '图纸3',
          src: require('@/assets/house.jpg')
        },
        {
          remark: '图纸4',
          src: require('@/assets/house2.jpg')
        }
      ],

      imagesViewer: false,

      maxHeight: 200
    }
  },
  mounted() {
    this.maxHeight =
      this.$store.state.clientHeights - 50 - 28 - 40 - 30 - 68 - 40
  },
  created() {
    this.funSelectAllBlueprint()
    const temp = verifyUserPermission(this.$store.state.routersave.userInfo)
    if (temp !== 0) {
      this.unitOptionsDisabled = true
      this.insertForm.customerUnitId = temp
    }
  },
  methods: {
    reset() {
      this.page.id = ''
      this.funSelectAllBlueprint()
    },
    handleRemove(file, fileList) {
      this.insertForm.blueprintUrl = ''
    },
    funSelectAllBlueprint() {
      const temp = verifyUserPermission(this.$store.state.routersave.userInfo)
      if (temp !== 0) {
        this.page.id = temp
      }
      selectAllBlueprint(this.page).then((res) => {
        this.blueprintList = res
      })
    },
    handleUpSuccess(response, file, fileList) {
      this.insertForm.blueprintUrl = response
    },
    handleUpSuccessEdit(response, file, fileList) {
      this.updateForm.blueprintUrl = response
    },
    updateBlueprint(blueprint) {
      this.updateDialogVisible = true
      this.updateForm = JSON.parse(JSON.stringify(blueprint))
    },
    updateConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateBlueprintByPrimaryKey(this.updateForm).then((res) => {
            if (res === 1) {
              this.$message({
                message: '成功',
                type: 'success'
              })
              this.updateDialogVisible = false
              this.funSelectAllBlueprint()
              this.fileList.pop()
            } else {
              this.$message({
                message: '似乎已经有人删除了',
                type: 'info'
              })
            }
          })
        }
      })
    },
    deleteBlueprint(blueprintId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteBlueprintByPrimaryKey(blueprintId).then((res) => {
            if (res === 0 || res === 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.funSelectAllBlueprint()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    cancel(formName) {
      for (const key in this.formName) {
        if (this.formName.hasOwnProperty(key)) {
          this.formName[key] = ''
        }
      }
      this.$refs[formName].resetFields()
      this.insertDialogVisible = false
      this.updateDialogVisible = false
    },
    addConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          insertBlueprint(this.insertForm).then((res) => {
            if (res === 1) {
              this.$message({
                message: '成功',
                type: 'success'
              })
              for (const key in this.insertForm) {
                if (this.insertForm.hasOwnProperty(key)) {
                  this.insertForm[key] = ''
                }
              }
              this.funSelectAllBlueprint()
              this.insertDialogVisible = false
              this.fileList.pop()
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-img-list >>> .el-card__body {
  padding-bottom: 10px;
}

.card-img {
  margin-bottom: 10px;
  margin-right: auto;

  >>> .el-card__body {
    padding: 0;
  }

  .remark-info {
    padding: 5px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 4px;
    color: white;

    .delete-dangers {
      color: #f56c6c;
      float: right;
    }

    .update-info {
      float: right;
      color: rgb(107, 233, 170);
    }
  }

  .img-info {
    width: 100%;
    height: 200px;
  }
}

.img-el-row-size {
  width: 100%;
  overflow-y: scroll;
}
</style>
