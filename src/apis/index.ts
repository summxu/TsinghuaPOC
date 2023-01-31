/*
 * @Author: Chenxu
 * @Date: 2022-12-29 11:22:42
 * @LastEditTime: 2023-01-31 17:07:32
 * @Msg: Nothing
 */
import { UserState } from "../provider/user-provider";
import { dashApi, request } from "./request";
import { GuestUserInfo } from "./utils/interface";

// 对象转URLcode
const json2url = (json) => {
  let tempArr: string[] = []
  Object.keys(json).forEach(item => {
    tempArr.push(`${encodeURIComponent(item)}=${encodeURIComponent(json[item])}`)
  })
  return tempArr.length ? '?' + tempArr.join('&') : ''
}

// 框架内基础登录(自定义接口，没用到)
export const loginBase = (data: { account: string, password: string }) => {
  return request<{ token: string }>({
    url: '/api/auth/v1/request-login-token',
    method: 'POST',
    data,
    header: { Authorization: '' }
  });
};

// 账号密码登录/绑定(自定义接口)
export const login = (data: { code: string, pwd: string, login_code: string }) => {
  return request<{ token: string }>({
    url: '/feishu_api/user_login',
    method: 'POST',
    data,
    header: { Authorization: '' }
  });
};

// 飞书openID登录
export const feishuOpenIDLogin = (data: { code: string }) => {
  return request<{ token: string }>({
    url: '/feishu_api/openid_login' + json2url(data),
    method: 'POST',
    data,
    header: { Authorization: '' }
  });
};

// 获取当前用户信息
export const userInfo = () => {
  return request<GuestUserInfo & { data: UserState }>({
    url: '/user/info',
    method: 'POST'
  });
};

// 获取当前用户详细信息表
export const userInfoDetail = (uid: number) => {
  return dashApi.getByRawID({
    vars: {
      model: 'User',
      fields: ['nickname', 'email', 'student_id.sfzh', 'student_id.pycc', 'teacher_id.id', 'student_id.id', 'student_id.code', 'fsopen_id'],
      id: uid,
      match_record_tags: []
    }
  })
};

// 获取学生表的数据
export const getStudentInfo = (stuid: number) => {
  return dashApi.getByRawID({
    vars: {
      model: 'Student',
      fields: ['id', 'yuanxi_id.name', 'dsxx_id.name', 'dbsj', 'dbwy_id', 'gyxxjd', 'sfyyhy'],
      id: stuid,
      match_record_tags: []
    }
  })
};

// 修改学生表的预约为1
// 获取学生表的数据
export const setYYY = (stuid: number) => {
  return dashApi.save({
    vars: {
      model: 'Student',
      values: {
        id: stuid,
        sfyyhy: '1'
      }
    }
  })
};

// 获取教师表的数据
export const getTeacherInfo = (tecid: number) => {
  return dashApi.getByRawID({
    vars: {
      model: 'Teacher',
      fields: ['id', 'yuanxi_id.name'],
      id: tecid,
      match_record_tags: []
    }
  })
};

// 取学生下的委员会成员
export const getWyhcyList = (stuid: number) => {
  return dashApi.search({
    vars: {
      model: 'Dbwy',
      fields: ['sf', 'teacher_id.name', 'teacher_id.yuanxi_id.name', 'teacher_id.zhicheng'],
      condition: {
        logic_operator: "&",
        children: [{
          leaf: {
            field: 'Student',
            comparator: '=',
            value: stuid,
          }
        }]
      },
      limit: 999,
      offset: 0
    }
  })
}

// 新增答辩表文档
export const saveDocument = (values: {
  student_id: number
  lx: '1' | '2',
  uploaded_file_ids: number[]
}) => {
  return dashApi.save({
    vars: {
      model: 'Dbfj',
      values
    }
  })
}

// 预约会议
export const booking = (data: any) => {
  return request({
    url: '/feishu/create_meeting',
    method: 'POST',
    data
  });
};


// 获取答辩文档
export const getDocs = (lx: '1' | '2') => {
  return dashApi.search({
    vars: {
      model: 'Dbfj',
      fields: ['id', 'uploaded_file_ids.origin_filename', 'uploaded_file_ids.download_url'],
      condition: {
        logic_operator: "&",
        children: [{
          leaf: {
            field: 'lx',
            comparator: '=',
            value: lx,
          }
        }]
      },
      limit: 999,
      offset: 0
    }
  })
}

// 删除答辩文档
export const delDocs = (id: number) => {
  return dashApi.unlink({
    vars: {
      model: "Dbfj",
      id
    }
  })
}

// 测试取出所有院系
export const getAllYanXi = ({ offset, limit, searchValue }) => {
  return dashApi.search({
    vars: {
      model: 'student',
      fields: ['code', 'name'],
      condition: {
        logic_operator: "&",
        children: [{
          leaf: {
            field: 'name',
            comparator: 'like',
            value: searchValue,
          }
        }]
      },
      limit,
      offset
    }
  })
}
